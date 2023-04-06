import { Link, useNavigate, useParams } from "react-router-dom";
import { Box } from "@mui/system";
import { AppBar, Container, Toolbar, Typography, Button } from "@mui/material/";


const axios = require("axios").default;

export default function DelTopic(props) {
 
  const { id } = useParams();
  const navigate = useNavigate();
  const apiUrl = "http://localhost:8001/web/api";
  

  async function handleFormSubmit() {
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

  
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Форум Ху..уМ
          </Typography>
        </Toolbar>
      </AppBar>
      
      <Container maxWidth="sm">
            <Typography variant="h6" align="center" color="textPrimary" gutterBottom>
            Внимание, топик будет удален вместе со всеми сообщениями
            </Typography>
      </Container>
      <Container maxWidth="sm" sx={{ mt: 10, display: 'flex', justifyContent: 'center' }}>
        <form id="form" onSubmit={handleFormSubmit}>
          <Box sx={{ mt: 10 }}>
            <Button 
              variant="contained" 
              color="primary" 
              type="submit" sx={{ mr: 2 }}
              style={{ backgroundColor: 'red' }}
              >
              удалить
            </Button>
            <Button variant="outlined" color="inherit" component={Link} to="/BasicCard">
              отмена
            </Button>
          </Box>
        </form>
      </Container>
  </>
  );
  
}
