import React, { useState } from "react";
import { AppBar, Container, Toolbar, Button } from "@material-ui/core/";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@mui/material/TextField";
import { Link, useNavigate } from "react-router-dom";
import { Box } from "@mui/system";
import { getUserRegistration } from "../../services/ApiQueryModule";
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import MainLayout from "../../pages/layout/MainLayout";


const useStyles = makeStyles((theme) => ({
  input: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: theme.spacing(8),
    minHeight: "calc(100vh - 64px)",
    [theme.breakpoints.up("sm")]: {
      paddingLeft: theme.spacing(10),
      paddingRight: theme.spacing(10),
    },

    marginTop: theme.spacing(8),

    '& > *': {
      marginBottom: theme.spacing(2),
    },
    Box: {
      '& > *': {
        marginRight: theme.spacing(2),
      }
    }
  },
  name: {
    flexGrow:1,
    textAlign: 'center',
  },
  popup: {
    marginTop: theme.spacing(10),
    "& .MuiAlert-icon": {
      fontSize: theme.typography.h4.fontSize,
      marginRight: theme.spacing(2),
    },
    "& .MuiAlert-message": {
      fontSize: theme.typography.h4.fontSize,
    }
  },
  
}));


 


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function RegistrationForm() {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null)
  const navigate = useNavigate();
  const classes = useStyles();
  const [value, setValue] = React.useState('USER');
  

  const handleChange = (event) => {
    setValue(event.target.value);
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    data.set("role", value);
    try {
      const response = await getUserRegistration(data, setError);
      setSuccess("Пользователь успешно зарегистрирован");
      setTimeout(() => window.history.back(), 3000);
    } catch (error) {
      setError("Пользователь с таким именем уже существует");
    }
  };

  

  return (
    <div>
      <MainLayout />
      <form id="form" onSubmit={handleSubmit}>
        <div className={classes.input}>
          <Box>
            <div>
              полное имя:
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
            </div>
            <div>
            <FormControl component="fieldset">
              <FormLabel component="legend">Укажите роль</FormLabel>
              <RadioGroup aria-label="userRole" name="userRole" value={value} onChange={handleChange}>
                <FormControlLabel value="USER" control={<Radio />} label="USER" />
                <FormControlLabel value="ADMIN" control={<Radio />} label="ADMIN" />
                <FormControlLabel value="MANAGER" control={<Radio />} label="MANAGER" />
              </RadioGroup>
            </FormControl>
            </div>
            <div>
              пароль:
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
            </div>
          </Box>
          <Box>
            <Button variant="contained" color="primary" type="submit">
              сохранить
            </Button>
            <Button variant="outlined" color="inherit" component={Link} onClick={() => navigate(-1)}>
              отмена
            </Button>
          </Box>
          <Snackbar className={classes.popup} open={!!error} autoHideDuration={6000} onClose={() => setError(null)}>
            <Alert severity="error" onClose={() => setError(null)}>
              {error}
            </Alert>
          </Snackbar>
          <Snackbar className={classes.popup} open={!!success} autoHideDuration={6000} onClose={() => setSuccess(false)}>
            <Alert severity="success" onClose={() => setSuccess(null)}>
              {success}
            </Alert>
          </Snackbar>
        </div>
      </form>
    </div>
  );
}

export default RegistrationForm;
