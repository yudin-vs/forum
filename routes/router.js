const Router = require("express");
const router = new Router();
const multer = require('multer');
const controller = require("../controllers/controller");
const { check } = require("express-validator");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const upload = multer({ dest: '../FormsOfDocuments' });


router.post("/registration",  [
    check("username", "Имя пользователя не может быть пустым").notEmpty(),
    check("password", "Пароль должен быть больше 4 и менше 10 символов").isLength({min:4, max:10})
], controller.registration);
router.post("/login", [
    check("username", "Имя пользователя не может быть пустым").notEmpty(),
    check("password", "Пароль должен быть больше 4 и менше 10 символов").isLength({min:4, max:10})
],controller.login);
router.get("/currentUser/:id", controller.getCurrentUser);
router.get("/users", roleMiddleware(["ADMIN"]), controller.getUsers);
router.delete("/users/:id", controller.deleteUser);
router.patch("/users/:id", controller.editUser);
router.get("/users/search/:username", controller.searchUser);
router.get("/resources/search/:title", controller.searchResource);
router.post("/create", upload.single('file'), controller.createResource);
router.get("/resources", authMiddleware, controller.getResources);
router.delete("/resources/:id", controller.deleteResources);
router.patch("/resources/:id", controller.editResources);
// router.patch("/addParamToResource/:id", authMiddleware, controller.addParamToResource);



module.exports = router;