import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import {Link} from "react-router-dom";
import AddIcon from "@material-ui/core/SvgIcon/SvgIcon";
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    title: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
        flex: '1 1 100%',
    },
    cardHeader: {
        flexGrow: 1,
    },
    cardActions: {
        textAlign: 'right',
    }
}));

export default function CardTitle(props) {
    const classes = useStyles();

    return (
        <Grid
            container
            direction="row"
            alignItems="center"
            className={classes.cardHeader}
        >
            <Grid item xs={6}>
                <Typography variant="h6" className={classes.title}>
                    {props.title}
                </Typography>
            </Grid>
            <Grid item xs={6} className={classes.cardActions}>
                {props.children}
            </Grid>
        </Grid>
    );
}