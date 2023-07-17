import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
    root: {
        display: 'inline-block',
        margin: theme.spacing(1),
        [theme.breakpoints.down('xs')]: {
            width: '100%',
            marginTop: 0,
            marginRight: 0,
            marginLeft: "100px",
        }
    },
    title: {
        fontSize: 18,
    },
    cardCounter: {
        fontSize: 14,
        marginTop: theme.spacing(1)
    },
    cardButton: {
        width: '100%',
        height: 307
    },
    iconContainer: {
        height: 195,
        textAlign: 'center',
        '& svg' : {
            color: theme.palette.text.secondary,
            width: 110,
            height: 110
        }
    },
    cardContent: {
        height: 295,
        width: 236
    }
}));

export default function DashboardCard(props) {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <Button component={Link} to={props.to} className={classes.cardButton} >
                <CardContent className={classes.cardContent}>
                    <div className={classes.iconContainer}>
                        {props.icon === undefined ? '' : React.createElement(props.icon)}
                    </div>
                    <Typography className={classes.title} variant="h5" component="h2">
                        {props.label}
                    </Typography>
                    {props.itemsCount === undefined ? '' : <Typography className={classes.cardCounter} color="textSecondary" component="p">
                        Items count: {props.itemsCount}
                    </Typography>}
                </CardContent>
            </Button>
        </Card>
    );
}