import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import { Link, useNavigate, useParams } from "react-router-dom";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import DeleteButton from "../../components/buttons/DeleteButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableHead from '@material-ui/core/TableHead';
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell/TableCell";
import TextField from '@mui/material/TextField';
import IconButton from "@material-ui/core/IconButton";
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import CardTitle from "../../components/form/CardTitle";
import { getResources, getDeleteResources, getSearchResources } from "../../services/ApiQueryModule";
import MainLayout from "../../pages/layout/MainLayout";
import DeleteIcon from '@material-ui/icons/Delete';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const useStyles = makeStyles(theme => ({
    card : {
        padding: theme.spacing(3),
        marginLeft: theme.spacing(40),
        marginRight: theme.spacing(20),
    },
    formActions: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },
    leftButtons: {
        display: "flex",
        alignItems: "center",
    },
    Pagination: {
        marginLeft: '1500px',
    },
    cellButton: {
        marginRight: '30px',
    },
    rightButtons: {
        display: 'inline-block',
        width: '70%',
        textAlign: 'right',
        [theme.breakpoints.down('xs')]: {
            width: '100%',
            display: 'block',
        },
        '& button' : {
            marginLeft: theme.spacing(2),
            [theme.breakpoints.down('xs')]: {
                marginLeft: 0,
                marginTop: theme.spacing(1)
            }
        }
    },
    relatedEntityLink: {
        marginRight: theme.spacing(1)
    },
    searchField: {
        marginRight: "10px",
        marginBottom: theme.spacing(2),
        width: 200,
        flexGrow: "1",
    },
    createButton: {
        marginBottom: theme.spacing(2),
        width: 200,
        flexGrow: "1",
    },
}));

export default function UserViewPage() {
    const classes = useStyles();
    const navigate = useNavigate();
    const [resources, setResources] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResources, setSearchResources] = useState([]);
    const [totalResources, setTotalResources] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const totalPages = Math.ceil(totalResources / rowsPerPage);
    

    

    useEffect(() => {
        async function fetchResources() {
          const fetchedResources = await getResources(currentPage, rowsPerPage);
          setTotalResources(fetchedResources.totalResources);
          setResources(fetchedResources.resourcesWithParams);
        
        }
        fetchResources();
      }, [currentPage, rowsPerPage]);
      
      async function handleDelete(resourceId) {
         
        try {
          await getDeleteResources(resourceId);
          const fetchedResources = await getResources(currentPage, rowsPerPage);
          setTotalResources(fetchedResources.totalResources);
          setResources(fetchedResources.resourcesWithParams);
          
        } catch (error) {
          console.error(error);
        }
    };

    async function handleSearchChange(event) {
        setSearchQuery(event.target.value);
        
    };

    async function search() {
               
        try {
            const searchResource = await getSearchResources(searchQuery);
            setSearchResources(searchResource);
                     
          } catch (error) {
            console.error(error);
          }
    };

    async function handlePageChange(event, page) {
        setCurrentPage(page);
        
        try {
            const fetchedResources = await getResources(currentPage, rowsPerPage);
                setTotalResources(fetchedResources.totalResource);
                setResources(fetchedResources.resourcesWithParams);
                      
          } catch (error) {
            console.error(error);
          }

   }
    
   console.log(searchResources)
    return (
        <div>
        <MainLayout />
        <Card className={classes.card}>
            <CardTitle title="Ресурсы">
            <TextField 
                label="Поиск"
                value={searchQuery}
                onChange={handleSearchChange}
                variant="outlined"
                margin="dense"
                className={classes.searchField}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end" onClick={search}>
                            <IconButton>
                                <SearchIcon />
                            </IconButton>
                        </InputAdornment>
                    )
                }}
            />
                <Button 
                    variant="contained" 
                    color="primary"
                    onClick={() => navigate("/CreateResource")}
                    className={classes.createButton}
                >
                    Создать ресурс
                </Button>
            </CardTitle>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell><strong>Имя</strong></TableCell>
                        <TableCell><strong>Описание</strong></TableCell>
                        <TableCell><strong>Параметры</strong></TableCell>
                        <TableCell><strong>Дата создания</strong></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {searchQuery && searchResources.length > 0 ? searchResources.map(searchResource => (
                        <TableRow key={searchResource._id}>
                        <TableCell>
                            {searchResource.title}
                        </TableCell>
                        <TableCell>
                            {searchResource.description}
                        </TableCell>
                        <TableCell>
                            {searchResource.params.statement}
                        </TableCell>
                        <TableCell>
                            {}
                        </TableCell>
                        <TableCell>
                          <div className={classes.cellButton}>  
                          <Button
                            variant="outlined"
                            color="primary"
                            startIcon={<EditIcon />}
                            onClick={() => {
                                navigate(`/ResourcesService/EditUser/${searchUser._id}`);
                               }}
                          >
                            
                          </Button>  
                          <DeleteButton
                            aria-label="удалить"
                            onConfirm={() => handleDelete(searchResource._id)}
                            title="Удаление ресурса"
                            content="Вы уверены, что хотите удалить этот ресурс?"
                          >
                          <DeleteIcon />
                          </DeleteButton>
                          </div>
                        </TableCell>     
                      </TableRow>
                    )) :
                    resources.map(resource => (
                      <TableRow key={resource._id}>
                        <TableCell>
                            {resource.title}
                        </TableCell>
                        <TableCell>
                            {resource.description}
                        </TableCell>
                        <TableCell>
                            {resource.params.statement}
                        </TableCell>
                        <TableCell>
                            {}
                        </TableCell>
                        <TableCell>
                          <div className={classes.cellButton}>  
                          <Button
                            variant="outlined"
                            color="primary"
                            startIcon={<EditIcon />}
                            onClick={() => {
                                navigate(`/EditResource/${resource._id}`);
                               }}
                          >
                            
                          </Button>  
                          <DeleteButton
                            aria-label="удалить"
                            onConfirm={() => handleDelete(resource._id)}
                            title="Удаление ресурса"
                            content="Вы уверены, что хотите удалить этот ресурс?"
                          >
                          <DeleteIcon />
                          </DeleteButton>
                          </div>
                        </TableCell>     
                      </TableRow>
                      ))}
                </TableBody>
            </Table>
            <div className={classes.formActions}>
                <div className={classes.leftButtons}>
                    <Button
                        component={Link}
                        color="primary"
                        className={classes.cancelButton}
                        startIcon={<ArrowBackIosIcon />}
                        onClick={() => navigate(-1)}
                    >
                        Back
                    </Button>
                <div className={classes.Pagination}>    
                    <Stack spacing={2}>
                        <Pagination 
                            count={totalPages} 
                            color="primary" 
                            page={currentPage}
                            onChange={handlePageChange}    
                        />
                    </Stack>
                </div>    
                </div>
                
            </div>
        </Card>
        </div>    
    );
}