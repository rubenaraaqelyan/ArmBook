import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ShowFriends from './ShowFriends';

const useStyles = makeStyles((theme) => ({
    block: {
        display: 'block',
        margin: 'auto'
    },
    top: {
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
    },
    text:{
        textAlign:'center'
    },
}));

const Friends = () => {
    const classes = useStyles();

    return (
        <Grid container className={classes.top}>
            <Grid container item className={classes.top}>
                <Typography className={classes.new} variant="h3" color="secondary">My friends!</Typography>
            </Grid>
            <ShowFriends />
        </Grid>
    )
}

export default Friends;
