import React from 'react';
import Avatar from './Avatar';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';


const useStyles = makeStyles((theme) => ({
    flex:{
        display:'flex',
    },
    relative:{
        position:'relative'
    },
    align :{
        display:'flex',
        alignItems:'center'
    }

}));


const UserCard = ({ children, user, handleClose, setShowFollowers, setShowFollowing, removeSearch }) => {
    const classes = useStyles();

    const handleCloseAll = () => {
        if (handleClose) handleClose();
        if (setShowFollowers) setShowFollowers(false);
        if (setShowFollowing) setShowFollowing(false);
        removeSearch("");
    }

    return (
        <Grid>
            <div>
                <Link to={`/search/user/${user?.id}`} onClick={handleCloseAll}
                      className={classes.align}>

                    <Avatar src={user?.avatar} size="big-avatar"/>

                    <div style={{transform: 'translateY(-2px)'}}>
                        <span>{user?.firstName}</span>
                    </div>
                </Link>
            </div>
            {children}
        </Grid>
    )
}


UserCard.propTypes = {
    user: PropTypes.object,
    handleClose: PropTypes.func,
    setShowFollowers: PropTypes.array,
    setShowFollowing: PropTypes.array,
}

export default UserCard;



