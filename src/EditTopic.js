import { Link, useNavigate, useParams } from "react-router-dom";
import { Box } from "@mui/system";
import TextField from '@mui/material/TextField';
import { AppBar, Container, Toolbar, Typography, Button } from "@mui/material/";


const axios = require("axios").default;

export default function EditTopics(props) {
 
  const { id } = useParams();
  const navigate = useNavigate();
  const apiUrl = "http://localhost:8001/web/api";
  

  async function handleFormSubmit(event) {
    event.preventDefault();
    const data = new FormData(document.getElementById('form'));
    let token = sessionStorage.getItem("token");
    token = JSON.parse(token);
    console.log(data);

    try {
      const res = await axios.put(
        `${apiUrl}/topics/${id}`,
        { title: data.get("title") },
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
          <Container>
          <form id="form" onSubmit={handleFormSubmit}>
      <Box sx={{ mt: 10 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="title"
          label="title"
          name="title"
          autoComplete="title"
          autoFocus
          
        />
      </Box>
      <Button 
      variant="contained" 
      color="primary" 
      type="submit" sx={{ mr: 2 }}>
        сохранить
      </Button>
      <Button variant="outlined" color="inherit" component={Link} to="/BasicCard">
        отмена
      </Button>
    </form>
          </Container>
        </>
      )
}