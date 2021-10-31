import React from 'react';
import { Button, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(() => ({
    light:{
        color:'white'
    }
}));

const Toast = ({msg, handleShow, bgColor}) => {
    const classes = useStyles();

    return (
        <Grid container className={`toast show ${bgColor}`}>
            <div className={`toast-header text-light ${bgColor}`}>
                <strong className={classes.light}>{msg.title}</strong>
                <Button className="close text-light"
                        data-dismiss="toast"
                        onClick={handleShow}>
                    &times;
                </Button>
            </div>
            <div className="toast-body">
                {msg.body}
            </div>
        </Grid>
    )
}

export default Toast;
