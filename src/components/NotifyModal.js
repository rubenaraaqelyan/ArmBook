import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import NoNotice from '../assets/images/notice.png';
import Avatar from './Avatar';
import {
    acceptFollowingRequest,
    denyRequest, getFriends
} from '../store/notify/action';
import { Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    between: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    align: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    danger: {
        color: 'red'
    },
    notify:{
        width:'200px'
    },
    second:{
        marginLeft:'10px'
    },
    avatar:{
        marginLeft:'25px'
    }

}));

const NotifyModal = () => {
    const classes = useStyles();
    const {suggestions} = useSelector(state => state);
    const dispatch = useDispatch();

    const handleAcceptFollow = (followerId) => {
        dispatch(acceptFollowingRequest(followerId)).then(() => dispatch(getFriends()));
    }

    const handleDenyRequest = (id) => {
        dispatch(denyRequest(id)).then(() => dispatch(getFriends()));
    }

    return (
        <>
            <Grid  className={classes.align}>
                <h3>Notification</h3>
            </Grid>
            <hr/>

            { suggestions?.users?.length === 0 &&
                <img src={NoNotice} alt="No Suggestions"/> }

            <Grid item className={classes.notify}>
                { suggestions.users.map(({followersUser}, index) => (
                        <Grid key={index}>
                            <div>
                                <Avatar src={followersUser.avatar} alt="" size='big-avatar'/>
                                <h6> {followersUser.firstName} </h6>
                                <h6> {followersUser.lastName} </h6>
                            </div>
                            <div>
                                <Button variant="contained" color="primary"
                                        className={classes.second}
                                        onClick={() => handleAcceptFollow(followersUser.id)}>
                                    Accept
                                </Button>
                                <Button variant="contained" color="secondary"
                                        className={classes.second}
                                        onClick={() => handleDenyRequest(followersUser.id)}>
                                    Deny
                                </Button>
                            </div>
                        </Grid>
                    ))
                }
            </Grid>
        </>
    )
}

export default NotifyModal;
