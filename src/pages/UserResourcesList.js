import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from "@mui/material/Button";
import Typography from '@material-ui/core/Typography';
import { AppBar, Container, Toolbar, Grid, Card, CardContent } from "@material-ui/core/";
import { Divider } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from "react-router-dom";
import { getResources, getDeleteResources } from "../services/ApiQueryModule";
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import { withStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: theme.spacing(8),
    minHeight: 'calc(100vh - 64px)',
    [theme.breakpoints.up('sm')]: {
      paddingLeft: theme.spacing(10),
      paddingRight: theme.spacing(10),
    },
  },
  resources: {
    width: '100%',
    maxWidth: '800px',
  },
  name: {
    flexGrow:1,
    textAlign: 'center',
  },
  title: {
    width: "70%",
  },
  active: {
    backgroundColor: theme.palette.action.selected,
  },
  list: {
    marginTop: theme.spacing(8),
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


const ResourcesList = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [resources, setResources] = useState([]);
  const [expanded, setExpanded] = React.useState('panel1');

  useEffect(() => {
    async function fetchResources() {
      const fetchResources = await getResources();
      setResources(fetchResources);
    }
    fetchResources();
  }, []);
  
  async function handleFormSubmit(props) {
     console.log(props);
    try {
      await getDeleteResources(props);
      const updatedResources = await getResources();
      setResources(updatedResources);
      
    } catch (error) {
      console.error(error);
    }
  
  };
  
  const AccordionDetails = withStyles((theme) => ({
    root: {
      padding: theme.spacing(2),
    },
  }))(MuiAccordionDetails);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
   
  return (
    <div>
      <AppBar position="fixed">
        <Container fixed>
          <Toolbar>
            <Typography
              className={classes.name}>
              журнал заявок под АДМИНОМ
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
      <Container className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Divider />
                 <TableContainer>
                 <div className={classes.root}>
                  <h1>ресурсы</h1>
                    <div className={classes.resources}>
                      {resources.map((resource) => (
                        <div key={resource.id}>
                          <Accordion square expanded={expanded === `panel-${resource.id}`} 
                            onChange={handleChange(`panel-${resource.id}`)}>
                          <AccordionSummary aria-controls={`panel-${resource.id}-content`} 
                            id={`panel-${resource.id}-header`}>
                          <Typography className={classes.title}>
                              {resource.title}
                          </Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <Typography>
                              {resource.description}
                            </Typography>
                          </AccordionDetails>
                          </Accordion>
                        </div>
                      ))}
                    </div>
                </div> 
                </TableContainer>
                <Divider />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default ResourcesList;