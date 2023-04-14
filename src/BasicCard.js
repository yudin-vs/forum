import React, { Link, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { useRef} from "react";
import { AppBar, Container, Toolbar, 
  Typography, Box, Paper, Grid, Card, CardContent, Pagination, CardActions } from "@mui/material/";
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@mui/material/Avatar';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell/TableCell";
import TableHead from '@mui/material/TableHead';


const axios = require("axios").default;
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  name: {
    flexGrow:1
  },
  mainFeaturesPost: {
    position: "relative",
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    boxShadow: "none"
  },
 
  mainFeaturesPostContent: {
    position: "relative",
    padding: theme.spacing(6),
    marginTop: theme.spacing(8),
    boxShadow: "none"
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
  } 
  
}))


export default function BasicCard(effect, dependencies = []) {
  const classes = useStyles();
  const navigate = useNavigate();
  const apiUrl = "http://localhost:8001/web/api";
  const [topics, setTopics] = useState([]);
  const isInitialMount = useRef(true);
  const [login, setLogin] = useState(false);
  const perPage = 5;
  const [currentPage, setCurrentPage] = useState(1)
  const [currentUserId, setCurrentUserId] = useState();
  let token = sessionStorage.getItem("token");
  token = JSON.parse(token);
  const pageSize = 20;
  const [avatar, setAvatar] = useState("");

    function changePage(props) {
      
      navigate("/BasicCard/" + props*1)
      setCurrentPage(props);
    }
    
  
  useEffect(() => {
    if (!token) return
    if (isInitialMount.current) {
        isInitialMount.current = false;
      } else {
        return effect();
      };
      
    async function fetchData() {
       
       
      
       try {
        const request1 = axios.get(
          `${apiUrl}/topics?pageSize=${pageSize}&sort=id`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const request2 = axios.get(`${apiUrl}/users/profile`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const [res1, res2] = await Promise.all([request1, request2]);
    
        
        
        setTopics(res1.data);
        setLogin(true);
        setCurrentUserId(res2.data.id);
        setAvatar(res2.data.name);
        
      } catch (error) {
        console.error(error);
      }
      
    }
  
    fetchData();
    }, [token])



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
      return time;
    }


    function handleButton() {
      login? window.sessionStorage.clear(setLogin(false)):navigate("/SignIn")
    }

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
        children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
      };
    }

    
      return(
     <>
      <AppBar position="fixed">
        <Container fixed>
          <Toolbar>
            <Typography
            className={classes.name}>
            Форум
            </Typography>
            <Box style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', alignItems: 'center', gridGap: '10px', border: '1px solid gray', padding: '10px' }}>
            <div>
            {login?
              <Avatar {...stringAvatar(avatar)}/>:
              <Avatar src="/broken-image.jpg" />
            }
            </div>
            <div>
            <Select>
              <MenuItem onClick={handleButton}>{login?"выход":"вход"}</MenuItem>
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
                  color="#000000"
                  gutterBottom               
                  >
                    Добро пожаловать на форум!
                  </Typography>
                  {login?
                  <Typography
                    variant="h5"
                    color="inherit"
                    paragraph
                    >
                  </Typography>:
                  <Typography
                    variant="h6"
                    color="#000000"
                    paragraph
                    >
                      Здесь вы можете обсудить интересующие вас темы и находить единомышленников.
                      Присоединяйтесь к сообществу!
                  </Typography>}
                  {login?
                  <Button 
                    variant="contained" 
                    color="primary"
                    onClick={() => navigate("/CreateTopic")}
                  >
                    Создать тему
                  </Button>:
                  <Button 
                  variant="contained" 
                  color="primary"
                  onClick={() => navigate("/SignIn")}
                  >
                    Вход
                  </Button> }
                </div>
              </Grid>
            </Grid>
          </Container>
        </Paper>
        <div className={classes.mainContent}>
          <Container maxWidth="sm">
            <Typography variant="h3" align="center" color="textPrimary" gutterBottom>
            Список разделов
            </Typography>
          </Container>
        </div>
        {login&&
        <Box py={4} display="flex" justifyContent="center">
        <Pagination 
          count={Math.ceil(topics.length / perPage)}
          page={currentPage}
          color="primary"
          onChange={(e, page) => changePage(page)}
        />
      </Box>
        }
        <div className={classes.cardGrid}>
              <Grid container spacing={4}>
              {topics
          .slice((currentPage - 1) * perPage, currentPage * perPage)
          .map((topic) => (
            <Grid item key={topic.id} md={12}>
            <Card sx={{height: '100%', display: 'flex', flexDirection: 'column'}}>
            <CardContent sx={{ flexGrow: 1 }} >
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Автор</TableCell>
                      <TableCell>Тема</TableCell>
                      <TableCell>дата создания</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow 
                      onClick={() => {
                      navigate("/topicPage/" + topic.id);
                      }}>
                      <TableCell className={classes.author}>
                      <Avatar sx={{ bgcolor: stringToColor(topic.user.name) }}>
                        {topic.user.name.split(' ').map((word) => word[0]).join('').toUpperCase()}
                      </Avatar>{topic.user.name}</TableCell>
                      <TableCell className={classes.title}>
                        {topic.title}
                      </TableCell>
                      <TableCell className={classes.create}>{timestampToDate(topic.created)}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            </Grid>
          ))}
          </Grid>
          {login&&
          <Box py={4} display="flex" justifyContent="center">
          <Pagination 
          count={Math.ceil(topics.length / perPage)}
          page={currentPage}
          color="primary"
          onChange={(e, page) => changePage(page)}
        />
      </Box>
          }
        </div>
       </main>
     </>
      )
}
    

