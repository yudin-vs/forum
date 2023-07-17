import React, { useState } from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from "react-router-dom"
import { getUserLogin } from "./services/ApiQueryModule";
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { useDispatch } from 'react-redux';




function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}



const theme = createTheme();

export default function Login() {
  const [open, setOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const response = await getUserLogin(event);
      dispatch({ type: 'LOGIN_USER', payload: response });
         if (response.role.includes("ADMIN")) {
          navigate("/ResourcesService");
        } else {
          navigate("/UserResourcesList");
        }
    } catch (error) {
      console.error(error);
      setSnackbarMessage('Неверное имя пользователя или пароль');
      setShowSnackbar(true);
      setOpen(true);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
    if (reason === "success") {
      setShowSuccessMessage(true);
      setOpen(true);
      
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            вход
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="имя пользователя"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="пароль"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              вход
            </Button>
            <Snackbar 
              open={open} 
              autoHideDuration={6000} 
              onClose={handleClose}>
            <Alert onClose={handleClose} severity="error">
                  {snackbarMessage}
            </Alert>
          </Snackbar>
          {showSnackbar && (
            <div>Неверное имя пользователя или пароль</div>
          )}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
 
}
