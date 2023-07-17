import React, { useEffect, useState } from "react";
import clsx from 'clsx';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Avatar } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {Link, useNavigate} from "react-router-dom";
import { getProfile } from "../../services/ApiQueryModule";
import { useSelector } from 'react-redux';


const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        height: "64px",
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    actionButtonsContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginLeft: 'auto',
        
        
    },
    logoLink: {
        textDecoration: 'none',
        color: 'inherit'
    },
    avatar: {
        display: 'inline-block',
        color: "Wite",
        
        marginRight:'90',
        background: "none",
    },
    currentUser: {
       color: "Wite",
       
       marginRight: '10px'
    },
}));


export default function TopBar(props) {
    const classes = useStyles();
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState("");
    const isLoggedIn = useSelector(state => state.user.isLoggedIn);
    const userData = useSelector(state => state.user.userData);

    useEffect(() => {
        async function fetchProfile() {
            const fetchProfile = await getProfile(userData.id);
          setCurrentUser(fetchProfile.username);
          
        }
        fetchProfile();
      }, []);
      
    return (
        <AppBar
            position="fixed"
            className={clsx(classes.appBar, {
                [classes.appBarShift]: props.open,
            })}
        >
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={props.handleDrawerOpen}
                    edge="start"
                    className={clsx(classes.menuButton, props.open && classes.hide)}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap>
                    {props.open ? '' : <Link to='/' className={classes.logoLink}>{props.logo}</Link>}
                </Typography>
                <div className={classes.actionButtonsContainer}>
                    <Typography variant="h6" className={classes.currentUser}>{currentUser}</Typography>
                    <Avatar variant="rounded" className={classes.avatar}></Avatar>
                    
                </div>
            </Toolbar>
        </AppBar>
    )
}
