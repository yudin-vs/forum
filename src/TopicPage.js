import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { AppBar, Container, Toolbar, 
  Typography, Paper, Grid, Card, CardContent, } from "@mui/material/";
import { useState, useEffect, } from "react";
import { useRef} from "react";
import { makeStyles } from '@material-ui/core/styles'

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
  },
  cardGrid: {
    marginTop: "35px"
  } 
  
}))




export default function TopicPage(effect, props) {
  const classes = useStyles();
  const navigate = useNavigate();
  const { id } = useParams();
  const [topic, setTopic] = useState({});
  const [messages, setMessages] = useState([]);
  const apiUrl = "http://localhost:8001/web/api";
  let token = sessionStorage.getItem("token");
  token = JSON.parse(token);
  const isInitialMount = useRef(true);
  

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
        const [res1, res2] = await Promise.all([request1, request2]);
       
      
       setTopic(res1.data);
       setMessages(res2.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
    }, [id]);

  
    
    return (
      <>
      <AppBar position="fixed">
        <Container fixed>
          <Toolbar>
            <Typography
            className={classes.title}>
            Форум Ху..уМ
            </Typography>
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
                  
                  
                  <Typography
                    variant="h6"
                    color="inherit"
                    paragraph
                    >
                      Здесь вы можете обсудить интересующие вас темы и находить единомышленников.
                      Присоединяйтесь к сообществу Ху..уМ!
                  </Typography>
                  
                </div>
              </Grid>
            </Grid>
          </Container>
        </Paper>
        <div className={classes.mainContent}>
          <Container maxWidth="sm">
            <Typography 
              variant="h3" 
              align="center" 
              color="textPrimary" 
              gutterBottom>
              Сообщения
            </Typography>
            <Button 
              variant="contained" 
              color="primary"
              onClick={() => navigate("/CreateMessages/" + topic.id)}>
              ответить на тему
            </Button>
          </Container>
        </div>
        <div className={classes.cardGrid}>  
          <Grid container spacing={4}  justifyContent="center">  
            <Grid  item xs={12}>
              <Card sx={{height: '100%', display: 'flex', flexDirection: 'column', width: '100%' }}>
                <CardContent sx={{ flexGrow: 1 }} >
                  <Typography gutterBottom variant="h5" 
                    component="h2">
                    {topic.title}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid> 
        </div>   
            <div>
            {messages.map((message) => (
              <Card key={message.id}>
                <CardContent>
                  <Typography variant="body1">{message.content}</Typography>
                  
                </CardContent>
              </Card>
            ))}
          </div>
          
        
         
        
        
       </main>
    </>
  );
};