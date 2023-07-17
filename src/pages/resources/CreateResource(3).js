import React, { useState } from "react";
import { AppBar, Container, Toolbar, Button } from "@material-ui/core/";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@mui/material/TextField";
import { Link, useNavigate } from "react-router-dom";
import { Box } from "@mui/system";
// import { createResource } from "../../services/ApiQueryModule";
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

async function CreateResource() {
  const apiUrl = "http://localhost:5000/api/";
  let token = sessionStorage.getItem("token");
  token = JSON.parse(token);
  const classes = useStyles();
  const navigate = useNavigate();
  const [file, setFile] = useState(null);

  const handleFile = (event) => {
    setFile(event.target.files[0]);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

   
    // try {
    //   const response = await axios.post(
    //     `${apiUrl}create`,
    //     {
          
    //       title: data.get("title"),
    //       description: data.get("description"),
    //       file: data.get("file")
    //     }
    //   );
    // } catch (error) {
    //   if (error.response && error.response.status === 401) {
    //     setErrorMessage("");
    //   } else if (error.response && error.response.status === 402) {
    //     setErrorMessage("");
    //   } else {
    //     setErrorMessage("");
    //   }
    // }
  };

  return (
    <div>
      <MainLayout />
      <form id="form" onSubmit={handleFormSubmit}>
        <div className={classes.input}>
          <Box>
            <label>
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
            </label>
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
            <Button variant="contained" color="primary" type="submit">
              сохранить
            </Button>
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