import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box } from "@mui/system";
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import { putEditResourceId, addParamToResource } from "../../services/ApiQueryModule";
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from "react-router-dom";
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

export default function EditResource() {
  const { id } = useParams();
  const navigate = useNavigate();
  const classes = useStyles();
  

  async function handleFormSubmit(event) {
    const title = event.target.title.value;
    const description = event.target.description.value;
    const statement = event.target.statement.value;

    const resourceData = { title, description };
    const statementData = { statement };

    try {
      await putEditResourceId(resourceData, id);
      // await addParamToResource(statementData, id);
  
      
      navigate("/resourcesList");
    } catch (error) {
      console.error(error);
    }
  
  }

    console.log(id)  
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
            {/* <label>
              формы документов:
              <TextField
                margin="normal"
                required
                fullWidth
                id="statement"
                label="формы документов"
                name="statement"
                autoComplete="statement"
                autoFocus
              />
            </label> */}
          </Box>
          <Box>
            <Button variant="contained" color="primary" type="submit">
              сохранить
            </Button>
            <Button variant="outlined" color="inherit" component={Link} onClick={() => navigate(-1)}>
              отмена
            </Button>
          </Box>
        </div>
      </form>
    </div>
  );
};