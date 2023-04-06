import React, { Link, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { useRef} from "react";
import { AppBar, Container, Toolbar, 
  Typography, Box, Paper, Grid, Card, CardContent, Pagination, CardActions } from "@mui/material/";
import { makeStyles } from '@material-ui/core/styles'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ChatIcon from '@mui/icons-material/Chat';

const axios = require("axios").default;
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  title: {
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
  const [currentUserId, setCurrentUserId] = useState(null);
  let token = sessionStorage.getItem("token");
  token = JSON.parse(token);
  const pageSize = 20;

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

    
      return(
     <>
      <AppBar position="fixed">
        <Container fixed>
          <Toolbar>
            <Typography
            className={classes.title}>
            Форум Ху..уМ
            </Typography>
            <Box >
            <Button
            color="inherit"
            variant="outlined" 
            type="submit" 
            sx={{ mt: 3, mb: 2 }}
            onClick={handleButton}
            >
            {login? "Выход":"Вход"}
            </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

       <main>
        <Paper className={classes.mainFeaturesPost}
        style={{ backgroundImage: `url(https://source.unsplash.com/random)` }}>
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
                    Добро пожаловать на форум Ху..уМ!
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
                    color="inherit"
                    paragraph
                    >
                      Здесь вы можете обсудить интересующие вас темы и находить единомышленников.
                      Присоединяйтесь к сообществу Ху..уМ!
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
        <Box py={4} display="flex" justifyContent="center">
        <Pagination 
          count={Math.ceil(topics.length / perPage)}
          page={currentPage}
          color="primary"
          onChange={(e, page) => changePage(page)}
        />
      </Box>
        <div className={classes.cardGrid}>
              <Grid container spacing={4}>
      {topics.slice((currentPage-1)*perPage, currentPage*perPage).map((topic) => (
        <Grid item key={topic.id} md={12}>
          <Card sx={{height: '100%', display: 'flex', flexDirection: 'column'}}>
            <CardContent sx={{ flexGrow: 1 }} >
            
                
              <Typography 
                gutterBottom variant="h5" 
                component="h2"
                onClick={() => {
            navigate("/topicPage/" + topic.id);
          }}
          >
                {topic.title}
              </Typography>
              <Typography>
                {topic.content}
              </Typography>
              <Typography 
              sx={{mt: 2}}
              color="text.secondary"
              variant="body2"
              >
              </Typography>
              <Typography variant="caption">
                Создано пользователем {topic.user.name}
              </Typography>
              <Typography variant="caption">
                  {timestampToDate(topic.created)}
              </Typography>
            </CardContent>
           
          </Card>
        </Grid>
          ))}
          </Grid>
          <Box py={4} display="flex" justifyContent="center">
          <Pagination 
          count={Math.ceil(topics.length / perPage)}
          page={currentPage}
          color="primary"
          onChange={(e, page) => changePage(page)}
        />
      </Box>
        </div>
       </main>
     </>
      )
}
    

