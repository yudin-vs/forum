const User = require("../models/User");
const Role = require("../models/Role");
const Resources = require("../models/Resources");
const ResourcesService = require("../models/Resources");
const Resource = require("../models/Resources");
const ResourceParams = require("../models/ResourceParams");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const { secret } = require("../configs/config");

const generateAccessToken = (id, roles) => {
    const payload = {
        id,
        roles
    }
    return jwt.sign(payload, secret, {expiresIn: "24h"})
}


class authController {
  async registration(req, res) {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(402).json({message: "Пароль не отвечает требованиям", errors})
        }
        const {username, password, userRole} = req.body
        const candidate = await User.findOne({username});
        if (candidate) {
            return res.status(401).json({message: "Пользователь с таким именем уже существует"});
        }
        const hashPassword = bcrypt.hashSync(password, 7);
       
        const user = new User({username, password: hashPassword, roles: [userRole] }) 
        await user.save()

        return res.json({message: "Пользователь успешно зарегистрирован"})
    } catch (e) {
        console.log(e);
        res.status(400).json({message: "ошибка регистрации"})
    }
    
};

    async login(req, res) {
        try {
            const {username, password} = req.body
            const user = await User.findOne({username})
            if(!user) {
                return res.status(400).json({message: `Пользователь ${username} не найден`})
            }
            const validPassword = bcrypt.compareSync(password, user.password)
            if (!validPassword) {
                return res.status(401).json({Message: "Введен неверный пароль"});
            }
            const token = generateAccessToken(user._id, user.roles);
            return res.json({token, role: user.roles, id: user.id});

        } catch (e) {
            console.log(e);
            res.status(402).json({massage: "ошибка входа"})
        }
    };

    async  getCurrentUser(req, res) {
      try {
        const userId = req.params.id; 
        const user = await User.findById(userId);
        if (!user) {
          return res.status(404).send('Пользователь не найден');
        }
        res.send(user);
      } catch (err) {
        console.error(err);
        res.status(500).send('Внутренняя ошибка сервера');
      }
    };
    

    async getUsers(req, res) {
      try {
        const totalUsers = await User.countDocuments();
        let rowsPerPage = req.body.rowsPerPage || 10;
        const pageNumber = +req.query.page || 1;
        const skip = (pageNumber - 1) * rowsPerPage;
        const users = await User.find().skip(skip).limit(rowsPerPage);
        res.json({totalUsers, users});
      } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Ошибка сервера" });
      }
    }
    
  
    async deleteUser(req, res) {
        try {
          await User.findByIdAndDelete(req.params.id);
          res.status(200).json({ message: "Пользователь удален" });
        } catch (e) {
          console.log(e);
          res.status(500).json({ message: "Что-то пошло не так" });
        }
      };

    async editUser(req, res) {
        try {
          const {username, password, userRole} = req.body
          const hashPassword = bcrypt.hashSync(password, 7);
          const user = await User.findByIdAndUpdate(
            req.params.id, {username, password: hashPassword, roles: [userRole] }, {
            new: true,
          });
          res.status(200).json(user);
        } catch (e) {
          console.log(e);
          res.status(500).json({ message: "Что-то пошло не так" });
        }
      };

      async createResource(req, res) {
        try {
          const { title, description } = req.body;
          const { filename: name, path } = req.file;
          const file = new File({
            name,
            url: path // путь для загруженного файла
          });
          await file.save();
          const params = new ResourceParams({
            resource: resource._id,
            statement: 'Заявление',
            files: [file._id] // добавляем загруженный файл в параметры
          });
          await params.save();
          const resource = new Resource({
            title,
            description,
            params: params._id,
            files: [file._id] // добавляем загруженный файл в ресурс
          });
          await resource.save();
          res.status(201).json(resource);
        } catch (error) {
          console.error(error);
          res.status(500).send('Server Error');
        }
      }
      
      async getResources(req, res) {
        const totalResources = await Resource.countDocuments();
        let rowsPerPage = req.body.rowsPerPage || 10;
        const pageNumber = +req.query.page || 1;
        const skip = (pageNumber - 1) * rowsPerPage;
        const resources = await Resource.find().skip(skip).limit(rowsPerPage);
        const resourcesWithParams = await Promise.all(resources.map(async resource => {
        const params = await ResourceParams.findOne({ resource: resource._id });
        return {
          ...resource.toObject(),
          params: params || {}
        };
    }));
    return res.json({totalResources, resourcesWithParams});
  };

    
      async deleteResources(req, res) {
        try {
          await Resource.findByIdAndDelete(req.params.id);
          await ResourceParams.deleteMany({ resource: req.params.id });
          res.status(200).json({ message: "Ресурс удален" });
          
        } catch (e) {
          console.log(e);
          res.status(500).json({ message: "Что-то пошло не так" });
        }
      };

      async editResources(req, res) {
        try {
          const resource = await Resource.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
          });
          res.status(200).json(resource);
        } catch (e) {
          console.log(e);
          res.status(500).json({ message: "Что-то пошло не так" });
        }
      };

      async searchUser(req, res) {
        try {
          const { username } = req.params;
          const regex = new RegExp(`^${username}`, "i");
          const users = await User.find({ username: regex });
          if (!users) {
            return res.status(404).json({ message: "Пользователь не найден" });
          }
          res.json(users);
        } catch (e) {
          console.log(e);
          res.status(500).json({ message: "Ошибка сервера" });
        }
      };

      async searchResource(req, res) {
        try {
          const { title } = req.params;
          const regex = new RegExp(`^${title}`, "i");
          const resources = await Resource.find({ title: regex });
          const resourcesWithParams = await Promise.all(resources.map(async resource => {
            const params = await ResourceParams.findOne({ resource: resource._id });
            return {
              ...resource.toObject(),
              params: params || {}
            };
        }));
          
          if (!resources) {
            return res.status(404).json({ message: "ресурс не найден" });
          }
          res.json(resourcesWithParams);
          
        } catch (e) {
          console.log(e);
          res.status(500).json({ message: "Ошибка сервера" });
        }
      };


      
     
    
};

module.exports = new authController();  