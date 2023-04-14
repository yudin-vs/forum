import { Link, useNavigate, useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import { AppBar, Container, Toolbar, 
  Typography, Paper, Grid, Card, CardContent, CardActions } from "@mui/material/";
import { useState, useEffect, } from "react";
import { useRef} from "react";
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ModalDelTopic from "./ModalDelTopic";
import { Box } from "@mui/system";
import TableCell from "@material-ui/core/TableCell/TableCell";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import Avatar from '@mui/material/Avatar';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TableHead from '@mui/material/TableHead';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

const axios = require("axios").default;
const useStyles = makeStyles((theme) => ({

  
  name: {
    flexGrow:1
  },
  mainFeaturesPost: {
   backgroundSize: 'cover'
  },
  cardIcon: {
    justifyContent: "flex-end"
  },
  author: {
    width: "10%",
  },
  title: {
    width: "70%",
  },
  create: {
    width: "10%",
  },
  messageContainer: {
    marginTop: "20px",
    paddingTop: "20px",
    borderTop: "1px solid",
  } 
  
  
  
}))

export default function TopicPage(effect, props) {
  const classes = useStyles();
  const navigate = useNavigate();
  const { id } = useParams();
  const [topic, setTopic] = useState({});
  const [topicUser, setTopicUser] = useState("");
  const [messages, setMessages] = useState([]);
  const apiUrl = "http://localhost:8001/web/api";
  const [currentUserId, setCurrentUserId] = useState(null);
  let token = sessionStorage.getItem("token");
  token = JSON.parse(token);
  const isInitialMount = useRef(true);
  const [open, setOpen] = useState(false);
  const [avatar, setAvatar] = useState("");
  const [login, setLogin] = useState(false);
  const [loaded, setLoaded] = useState(false);


  function handleButton() {
    login? window.sessionStorage.clear(setLogin(false)):navigate("/SignIn")
  }
    
      const handleOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

      async function handleFormSubmit(props) {
        let token = sessionStorage.getItem("token");
        token = JSON.parse(token);
        
    
        try {
          const res = await axios.delete(
            `${apiUrl}/topics/${id}`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
      
          
          navigate("/BasicCard");
        } catch (error) {
          console.error(error);
        }
      
      } 

  useEffect(() => {
    
    if (isInitialMount.current) {
        isInitialMount.current = false;
      } else {
        return effect();
      };
      
    async function fetchData() {
       
       
      
      try {
        const request1 = await axios.get(
          `${apiUrl}/topics/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const request2 = axios.get(
          `${apiUrl}/messages?topicId=${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const request3 = axios.get(`${apiUrl}/users/profile`,
          { headers: { Authorization: `Bearer ${token}` } }
        );  
        const [res1, res2, res3] = await Promise.all([request1, request2, request3]);
       
      
       setTopic(res1.data);
       setTopicUser(res1.data.user);
       setCurrentUserId(res3.data.id);
       setMessages(res2.data);
       setAvatar(res3.data.name);
       
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
    }, [id]);

    
    function stringToColor(string) {
      let hash = 0;
      let i;
    
      
      for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
      }
    
      let color = '#';
    
      for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
      }
      
    
      return color;
    }

    function stringAvatar(name) {
      
     
      return {
        sx: {
          backgroundColor: stringToColor(name),
        },
        children: `${name.split(' ')[0][0]}`,
      };
    }

    function  timestampToDate(unixTimestamp) {
      const a = new Date(unixTimestamp * 1000);
      const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      const year = a.getFullYear();
      const month = months[a.getMonth()];
      const date = a.getDate();
      const hour = a.getHours();
      const min = a.getMinutes();
      const sec = a.getSeconds();
      const time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
      setLoaded(true);
      return time;
    }
      
    
    return (
      <div>
      <AppBar position="fixed">
        <Container fixed>
          <Toolbar>
            <Typography
            className={classes.name}>
            Форум
            </Typography>
            <Box style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', alignItems: 'center', gridGap: '10px', border: '1px solid gray', padding: '10px' }}>
            <div>
            {avatar?
              <Avatar {...stringAvatar(avatar)}/>:
              <Avatar src="/broken-image.jpg" />
            }
            </div>
            <div>
            <Select>
              <MenuItem onClick={handleButton}>выход</MenuItem>
              <MenuItem onClick={() => navigate("/EditProfile/")}>профил</MenuItem>
            </Select>
            </div> 
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <main>
        <Paper className={classes.mainFeaturesPost}
        style={{ backgroundImage: `url(https://mobimg.b-cdn.net/v3/fetch/56/56820f11d06d0eae0fc38cb518bc5d3e.jpeg)` }}>
          <Container fixed>
            <Grid container>
              <Grid item md={6}>
                <div className={classes.mainFeaturesPostContent}>
                  <Typography
                  component="h1"
                  variant="h3"
                  color="inherit"
                  gutterBottom               
                  >
                    Добро пожаловать на форум!
                  </Typography>
                  
                  <Typography
                    variant="h6"
                    color="inherit"
                    paragraph
                    >
                      Здесь вы можете обсудить интересующие вас темы и находить единомышленников.
                      Присоединяйтесь к сообществу!
                  </Typography>
                  
                </div>
              </Grid>
            </Grid>
          </Container>
        </Paper>
        <div className={classes.mainContent} 
        style={{justifyContent: 'center', alignItems: 'center', textAlign: 'center'}}>
          <Typography 
          variant="h3" 
          align="center" 
          color="textPrimary" 
          gutterBottom>
              Сообщения
          </Typography>
          <Button variant="contained" 
          color="primary" 
          onClick={() => 
          navigate("/CreateMessages/" + topic.id)}>
            ответить на тему
          </Button>
        </div>
        <div className={classes.cardGridWrapper}> 
        <Grid item key={topic.id} md={12}>
            <Card sx={{height: '100%', display: 'flex', flexDirection: 'column'}}>
            <CardContent sx={{ flexGrow: 1 }} >
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Автор</TableCell>
                      <TableCell>Тема</TableCell>
                      <TableCell>дата создания</TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell className={classes.author}>
                        {/* <Avatar {...stringAvatar(topicUser)}/> */}
                        {topicUser.name}
                      </TableCell>
                      <TableCell className={classes.title}>
                        {topic.title}
                      </TableCell>
                      <TableCell className={classes.create}>
                          {loaded && timestampToDate(topic.created)}
                      </TableCell>
                      <Grid item xs={12} sm={6}>
                    {currentUserId === topicUser.id && (
                      
                      <CardActions>
                        <Tooltip title="изменить" arrow>
                          <IconButton
                              aria-label="delete" 
                              size="small"
                              color="primary"
                              onClick={() => {
                              navigate("/EditTopic/" + topic.id);
                               }}>
                            <EditIcon />
                          </IconButton>
                        </Tooltip>  
                        
                        <Tooltip title="Удалить" arrow>
                          <IconButton                
                              aria-label="delete" 
                              size="small"  
                              color="primary"
                              onClick={handleOpen}
                               >
                              <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                        <ModalDelTopic open={open} handleClose={handleClose}>
                          <h2>Внимание!!</h2>
                          <p>Пост будет удален вместе со всеми сообщениями</p>
                            <Box sx={{ mt: 10 }}>
                              <Button 
                                variant="contained" 
                                color="primary" 
                                type="submit" sx={{ mr: 2 }}
                                style={{ backgroundColor: 'red' }}
                                onClick={() => {handleFormSubmit(topic.id)}}>
                                удалить
                              </Button>
                              <Button 
                                variant="outlined" 
                                color="inherit"
                                onClick={handleClose}>
                                отмена
                              </Button>
                            </Box>  
                        </ModalDelTopic>
                        
                      </CardActions>
                    )}
                  </Grid>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            </Grid>
       
        </div>   
        <div className={classes.messageContainer}>
          {messages.map((message) => (
            <Card key={message.id}>
            <Table>
                <TableBody>
                    <TableRow>
                      <TableCell>Автор</TableCell>
                      <TableCell>Тема</TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className={classes.author}>
                        {message.user.name}
                      </TableCell>
                      <TableCell className={classes.title}>
                        {message.content}
                      </TableCell>
                      <TableCell className={classes.create}></TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};