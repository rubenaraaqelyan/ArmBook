import React from 'react';
import Avatar from '../Avatar';
import { useSelector, useDispatch } from 'react-redux';
import { GLOBALTYPES } from '../../store/actions/globalTypes';
import { Button, Grid } from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
import useTheme from '@material-ui/core/styles/useTheme';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },

}));

const Status = () => {
    const {auth} = useSelector(state => state)
    const dispatch = useDispatch()
    const classes = useStyles();
    const theme = useTheme();

    const changeStatusHandler = () => {
        dispatch({type: GLOBALTYPES.STATUS, payload: true})
    }

    return (
        <Grid className="status">
            <Avatar src={auth.user?.avatar} size="big-avatar"/>
            <Button color="primary" className="statusBtn flex-fill"
                    onClick={changeStatusHandler}>
                {auth.user?.lastName} , what are you thinking?
            </Button>
        </Grid>
    )
}

export default Status;
