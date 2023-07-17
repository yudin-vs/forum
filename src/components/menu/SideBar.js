import React from 'react';
import {makeStyles, useTheme} from "@material-ui/core/styles/index";
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Link, useLocation  } from 'react-router-dom'
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from '@material-ui/icons/Menu';
import MenuItemsService from "../../services/MenuItemsService";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    drawerClosed: {
        width: 0,
        flexShrink: 0,
        [theme.breakpoints.down('sm')]: {
            position: 'absolute'
        }
    },
    drawerOpen: {
        width: drawerWidth,
        flexShrink: 0,
        [theme.breakpoints.down('sm')]: {
            position: 'absolute'
        }
    },
    drawerTransition: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    drawerPaper: {
        width: drawerWidth
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing(2.5),
        ...theme.mixins.toolbar,
        justifyContent: 'flex-start',
    },
    menuButton: {
        right: theme.spacing(1),
        position: 'absolute'
    },
    logoLink: {
        textDecoration: 'none',
        color: theme.palette.text.primary
    },
    sections: {
        marginTop: "100px"
    },
    exitButton: {
        marginTop: "100px"
    }
}));


export default function SideBar(props) {
    const classes = useStyles();
    const theme = useTheme();
    const menuItems = MenuItemsService();
    const location = useLocation();
    const pathName = location.pathname;

    return (
        <Drawer
            className={clsx({
                [classes.drawerTransition]: true,
                [classes.drawerOpen] : props.open,
                [classes.drawerClosed] : !props.open
            })}
            variant="persistent"
            anchor="left"
            open={props.open}
            classes={{
                paper: classes.drawerPaper
            }}
            >
            <div className={classes.drawerHeader}>
                <Typography variant="h6" noWrap>
                    {props.open ? <Link to='/' className={classes.logoLink}>{props.logo}</Link> : ''}
                </Typography>
                <IconButton
                    color="inherit"
                    onClick={props.handleDrawerOpen}
                    className={clsx(classes.menuButton, !props.open && classes.hide)}
                >
                    <MenuIcon />
                </IconButton>
            </div>
            <Divider />
            <List className={classes.sections}>
                {menuItems.map((menuItem) => {
                    return <ListItem button component={Link} key={menuItem.label} to={menuItem.to} selected={isCurrentUrl(pathName, menuItem.to)}>
                        <ListItemIcon>{React.createElement(menuItem.icon)}</ListItemIcon>
                        <ListItemText primary={menuItem.label} />
                    </ListItem>
                })}
            </List>
            <IconButton 
                color="inherit"
                component={Link}
                to='/'
                className={classes.exitButton}>
                Выход
                <ExitToAppIcon />
            </IconButton>
        </Drawer>
    );
}

function isCurrentUrl(pathName, url)
{
    if (pathName === url) {
        return true;
    }

    return pathName.match('^' + url +  '\/') !== null;
}
