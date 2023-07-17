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
import { getUsers, getDeleteUser, getSearchUser } from "../../services/ApiQueryModule";
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
    let { id } = useParams();
    const classes = useStyles();
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchUsers, setSearchUsers] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    
    const totalPages = Math.ceil(totalUsers / rowsPerPage);
    

    useEffect(() => {
        async function fetchUsers() {
          const fetchedUsers = await getUsers(currentPage, rowsPerPage);
          setTotalUsers(fetchedUsers.totalUsers);
          setUsers(fetchedUsers.users);
          
        
        }
        fetchUsers();
      }, [currentPage, rowsPerPage]);
      
      async function handleDelete(userId) {
         
        try {
          await getDeleteUser(userId);
          const fetchedUsers = await getUsers(currentPage, rowsPerPage);
          setTotalUsers(fetchedUsers.totalUsers);
          setUsers(fetchedUsers.users);
          
        } catch (error) {
          console.error(error);
        }
    };

    async function handleSearchChange(event) {
        setSearchQuery(event.target.value);
        
    };

    async function search() {
               
        try {
            const searchUser = await getSearchUser(searchQuery);
            setSearchUsers(searchUser);
                      
          } catch (error) {
            console.error(error);
          }
    };

   async function handlePageChange(event, page) {
        setCurrentPage(page);
        
        try {
            const fetchedUsers = await getUsers(currentPage, rowsPerPage);
                setTotalUsers(fetchedUsers.totalUsers);
                setUsers(fetchedUsers.users);
                      
          } catch (error) {
            console.error(error);
          }

   }
    

    return (
        <div>
        <MainLayout />
        <Card className={classes.card}>
            <CardTitle title="Пользователи">
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
                    onClick={() => navigate("/CreateUser")}
                    className={classes.createButton}
                >
                    Создать пользователя
                </Button>
            </CardTitle>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell><strong>Идентификатор</strong></TableCell>
                        <TableCell><strong>Имя</strong></TableCell>
                        <TableCell><strong>Роль</strong></TableCell>
                        <TableCell><strong>Дата создания</strong></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {searchQuery && searchUsers.length > 0 ? searchUsers.map(searchUser => (
                        <TableRow key={searchUser._id}>
                        <TableCell>
                            {searchUser._id}
                        </TableCell>
                        <TableCell>
                            {searchUser.username}
                        </TableCell>
                        <TableCell>
                            {searchUser.roles.join(', ')}
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
                                navigate(`/EditUser/${searchUser._id}`);
                               }}
                          >
                            
                          </Button>  
                          <DeleteButton
                            aria-label="удалить"
                            onConfirm={() => handleDelete(searchUser._id)}
                            title="Удаление пользователя"
                            content="Вы уверены, что хотите удалить этого пользователя?"
                          >
                          <DeleteIcon />
                          </DeleteButton>
                          </div>
                        </TableCell>     
                      </TableRow>
                    )) :
                    users.map(user => (
                      <TableRow key={user._id}>
                        <TableCell>
                            {user._id}
                        </TableCell>
                        <TableCell>
                            {user.username}
                        </TableCell>
                        <TableCell>
                            {user.roles.join(', ')}
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
                                navigate(`/EditUser/${user._id}`);
                               }}
                          >
                            
                          </Button>  
                          <DeleteButton
                            aria-label="удалить"
                            onConfirm={() => handleDelete(user._id)}
                            title="Удаление пользователя"
                            content="Вы уверены, что хотите удалить этого пользователя?"
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