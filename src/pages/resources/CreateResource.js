import React, { useState } from "react";
import { AppBar, Container, Toolbar, Button } from "@material-ui/core/";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@mui/material/TextField";
import { Link, useNavigate } from "react-router-dom";
import { Box } from "@mui/system";
import { createResource } from "../../services/ApiQueryModule";
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
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

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function CreateResource() {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const classes = useStyles();
  
  const [file, setFile] = useState("");
    function handleFile(e) {
        console.log(e.target.file)
        setFile(e.target.files[0])
  

 
  };
  
  console.log(file)
  return (
    <div>
      <MainLayout />
      <form id="form">
        <div className={classes.input}>
          <Box>
            {/* <label>
              название:
              <TextField
                margin="normal"
                required
                fullWidth
                id="title"
                label="название ресурса"
                name="title"
                autoComplete="title"
                autoFocus
              />
            </label>
            <label>
              описание:
              <TextField
                margin="normal"
                required
                fullWidth
                id="description"
                label="описание"
                name="description"
                autoComplete="description"
                autoFocus
              />
            </label> */}
            <label style={{ display: "flex", flexDirection: "column" }}>
              формы документов:
              <TextField
                type="file"
                name="file"
                onChange={handleFile} 
                
              />
            </label>  
          </Box>
          <Box>
            {/* <Button variant="contained" color="primary" type="submit">
              сохранить
            </Button> */}
            <Button variant="outlined" color="inherit" 
              component={Link} onClick={() => navigate(-1)}>
              отмена
            </Button>
          </Box>
          
        </div>
      </form>
    </div>
  );
}

export default CreateResource;
