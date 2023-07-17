import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box } from "@mui/system";
import TextField from '@mui/material/TextField';
import { AppBar, Container, Toolbar, Typography, Button, Paper, Grid } from "@mui/material/";
import { putEditUserId } from "../../services/ApiQueryModule";
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from "react-router-dom";
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
  }
}));


export default function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const classes = useStyles();
  const [value, setValue] = React.useState('USER');

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  

  async function handleFormSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    data.set("role", value);
    try {
      await putEditUserId(data, id);
  
      
      navigate(-1);
    } catch (error) {
      console.error(error);
    }
  
  }

      
    return (
      <div>
      <MainLayout />
      <form id="form" onSubmit={handleFormSubmit}>
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
            <Button 
                variant="contained" 
                color="primary" 
                type="submit" sx={{ mr: 2 }}>
                  сохранить
            </Button>
            <Button 
                variant="outlined" 
                color="inherit" 
                component={Link} 
                onClick={() => navigate(-1)}
            >
                  отмена
            </Button>
          </Box> 
        </div>   
      </form>
    </div>
  );
}