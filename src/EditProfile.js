import { Link, useNavigate } from "react-router-dom";
import { Box } from "@mui/system";
import TextField from '@mui/material/TextField';
import { AppBar, Container, Toolbar, Typography, Button } from "@mui/material/";


const axios = require("axios").default;

export default function EditTopics(props) {
  const navigate = useNavigate();
  const apiUrl = "http://localhost:8001/web/api";
  

  async function handleFormSubmit(event) {
    event.preventDefault();
    const data = new FormData(document.getElementById('form'));
    let token = sessionStorage.getItem("token");
    token = JSON.parse(token);
    

    try {
      const res = await axios.patch(
        `${apiUrl}/users/profile`,
        { name: data.get("name"), 
        email: data.get("email"), 
        password: data.get("password"),
        body: data.get("body") },
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
                Форум
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
              id="name"
              label="имя"
              name="name"
              autoComplete="name"
              autoFocus
                />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="электронная почта"
              name="email"
              autoComplete="email"
              autoFocus
                />
                <TextField
              margin="normal"
              required
              fullWidth
              id="password"
              label="пароль"
              name="password"
              autoComplete="password"
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