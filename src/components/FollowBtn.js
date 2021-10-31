import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addFriend, cancelFriend } from '../store/profile/action';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';


const useStyles = makeStyles((theme) => ({
   top:{
       marginTop:'20px'
   }
}));


const FollowBtn = ({user, isFriend}) => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const [followed, setFollowed] = useState(false);
    const [load, setLoad] = useState(false);

    const { auth, profile } = useSelector(state => state);
    const {suggestions} = useSelector(state => state);

    const handleSendRequest=  async () => {
        if(load) return;

        setFollowed(true);
        setLoad(true);
        await dispatch(addFriend({users: profile.users, user, auth}));
        setLoad(false);
    }

    const handleDenyRequest = () => {
        dispatch(cancelFriend(user.id));
    }

    return (
        <>
            { isFriend
                    ? <Button variant="contained"
                              color="secondary"
                              onClick={handleDenyRequest}>
                        Cancel
                    </Button>
                    : <Button variant="contained"
                              color="primary"
                              className={classes.top}
                              onClick={handleSendRequest}>
                        Send Friend request
                    </Button> }
        </>
    )
}

FollowBtn.propTypes = {
    user: PropTypes.object,
}


export default FollowBtn;
