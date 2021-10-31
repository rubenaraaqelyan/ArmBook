import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getFriends } from '../../store/notify/action';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    block: {
        display: 'block',
        margin: 'auto'
    },
    top: {
        marginTop: '25px',
        position: 'fixed',
    }
}));

const RightSideBar = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        const token = localStorage.getItem("access_token");
        if (token) {
            dispatch(getFriends());
        }
    }, []);


    return (
        <Grid container className={classes.top}>
            <Grid container item>
                <Typography variant="h5" color="secondary">Suggestions!</Typography>
            </Grid>
        </Grid>
    )
}

export default RightSideBar;
