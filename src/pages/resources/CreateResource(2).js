 import React from "react";
 import { useState } from "react";
 import MainLayout from "../../pages/layout/MainLayout";
 import { createResource } from "../../services/ApiQueryModule";
 import { makeStyles } from "@material-ui/core/styles";
 import { Box } from "@mui/system";
 import TextField from "@mui/material/TextField";
 import {Axios} from 'axios';
 import { Button } from "@material-ui/core/";
 


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

async function CreateResource() {
  const [error, setError] = useState(null);
  
  const classes = useStyles();
  
  

    return(
        <div>
          <MainLayout />
          <form id="form">
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
                <label>
                  {/* форма документов:
                  <TextField 
                      type="file" 
                      name="file" 
                      /> */}
                  <Button variant="contained" color="primary" type="handleApi">
                    охранить
                  </Button>
                </label>
              </Box> 
            </div>
          </form>  
        </div>
    )
 }

 export default CreateResource;