import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import { AppBar, Container, Toolbar, Box, Button, TextField, IconButton } from "@material-ui/core/";
import { makeStyles } from '@material-ui/core/styles';
import { getResources, getResourceParams } from "../services/ApiQueryModule";
import { Grid } from '@mui/material';
import SearchIcon from '@material-ui/icons/Search';
import { useNavigate } from "react-router-dom";
import TableContainer from '@material-ui/core/TableContainer';
import { Divider } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@mui/icons-material/Edit';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    whiteSpace: "nowrap",
    alignItems: 'center',
  },
  containerMenu: {
    display: "flex",
    background: "white",
    width: "57%",
    height: "10%",
    position: "absolute",
    marginTop: '135px',
    right: "1000px",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    border: "1px solid lightGray",
    fontSize: "1.5rem",
    fontWeight: "bold",
    textAlign: "center",
    padding: "0.5rem",
  },
  searchInput: {
    display: "flex",
    width: '70%',
    flex: "1",
    marginRight: theme.spacing(1),
  },
  addButton: {
    display: "flex",
    marginRight: theme.spacing(1),
  },
  resources: {
    marginTop: "330px",
    maxWidth: "1700px",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "flex-end",
    background: "white",
    marginLeft: "358px",
    marginRight: "330px",
  },

  resourceCard: {
    width: "150%",
  },
  title: {
    width: "70%",
  },
  parameters: {
    background: "white",
    width: "25%",
    height: "87%",
    position: "absolute",
    marginTop: '135px',
    right: "100px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "1px solid lightGray",
    fontSize: "1.5rem",
    fontWeight: "bold",
    textAlign: "center",
    padding: "0.5rem",
    
  },
}));

const Accordion = withStyles({
  root: {
    border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    backgroundColor: 'rgba(0, 0, 0, .03)',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiAccordionSummary);


export default function Resources() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [resources, setResources] = React.useState([]);
  const [resourceParams, setResourceParams] = React.useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [expanded, setExpanded] = React.useState('panel1');

  let token = sessionStorage.getItem("token");
  token = JSON.parse(token);

  React.useEffect(() => {
    async function fetchData() {
      if (!token) return
      const fetchedResources = await getResources();
      const fetchedResourceParams = await getResourceParams();
      setResources(fetchedResources);
      setResourceParams(fetchedResourceParams);
      
    }

    fetchData();
  }, [token]);

  console.log(resourceParams);

  const filterResources = (resources) => {
  return resources.filter((resource) => {
    const regex = new RegExp(searchTerm, "gi");
    return (
      resource.title.match(regex) ||
      resource.description.match(regex) ||
      resource.parameters.join(" ").match(regex)
    );
  });
};

const handleExpandChange = (panel) => (event, newExpanded) => {
  setExpanded(newExpanded ? panel : false);
};
  return (
    <div className={classes.root}>
      <div className={classes.containerMenu}>
        <TextField 
          variant="outlined"
          label="Поиск"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={classes.searchInput}
          InputProps={{
            endAdornment: (
              <IconButton>
                <SearchIcon className={classes.searchIcon} />
              </IconButton>
            ),
          }}
        />
        <Button 
          variant="contained"
          color="primary"
          className={classes.addButton}
          onClick={() => navigate("/CreateResource")}
        >
          добавить ресурс
        </Button>
      </div>
      <div className={classes.parameters}>
        <Typography variant="h6">
          Параметры
        </Typography>
          
      </div>
       <div container spacing={3} className={classes.resources}>
        {resources.map((resource) => {
          const params = resourceParams.filter((param) => param.resource_id === resource.id);
          return (
            <Grid item xs={12} sm={6} md={4} key={resource.id} className={classes.resourceCard}>
            <MuiAccordion expanded={expanded === `panel-${resource.id}`} onChange={handleExpandChange(`panel-${resource.id}`)}>
                <MuiAccordionSummary className={classes.heading}>
                  <Typography>{resource.title}</Typography>
                </MuiAccordionSummary>
                <MuiAccordionDetails>
                  <Typography>{resource.description}</Typography>
                  {params.map((param) => (
                    <Typography key={param.id}>{param.statement}</Typography>
                  ))}
                </MuiAccordionDetails>
              </MuiAccordion>
            </Grid>
          );
        })}
      </div>
    </div>
  );
}