import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box } from "@mui/system";
import TextField from '@mui/material/TextField';
import { AppBar, Container, Toolbar, Typography, Button } from "@mui/material/";


const axios = require("axios").default;

export default function CreateTopic() {
  const navigate = useNavigate();
  const apiUrl = "http://localhost:8001/web/api";

  async function handleFormSubmit(event) {
    event.preventDefault();
    const data = new FormData(document.getElementById('form'));
    let token = sessionStorage.getItem("token");
    token = JSON.parse(token);
    
    try {
      const res = await axios.post(
        `${apiUrl}/topics`,
        { title: data.get("title"), body: data.get("body") },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(res.data);
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