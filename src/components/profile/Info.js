import React, { useState, useEffect } from 'react';
import Avatar from '../Avatar';
import EditProfile from './EditProfile';
import FollowBtn from '../FollowBtn';
import Followers from './Followers';
import Following from './Following';
import { GLOBALTYPES } from '../../store/actions/globalTypes';
import Grid from '@material-ui/core/Grid';
import PostCard from '../PostCard';
import FormDialog from './Dialog';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    danger: {
        color: 'red'
    }
}));


const Info = ({auth, dispatch}) => {
    const classes = useStyles();
    const {suggestions} = useSelector(state => state);
    const [onEdit, setOnEdit] = useState(false);


    const [showFollowers, setShowFollowers] = useState(false)
    const [showFollowing, setShowFollowing] = useState(false)


    useEffect(() => {
        if (showFollowers || showFollowing || onEdit) {
            dispatch({type: GLOBALTYPES.MODAL, payload: true})
        } else {
            dispatch({type: GLOBALTYPES.MODAL, payload: false})
        }
    }, [showFollowers, showFollowing, onEdit, dispatch]);

    const user = auth.user;
    return (
        <Grid className="info">
            {
                <Grid container item lg={12} className="info_container" >
                    <Avatar src={auth.user?.avatar} size="supper-avatar"/>

                    <Grid item className="info_content">
                        <div className="info_content_title">
                            <Typography variant="h2">{user?.firstName} {user?.lastName}</Typography>
                            {
                                user?.id === auth.user?.id
                                    ? <>
                                        <EditProfile/>
                                        <Grid item className="password">
                                            <FormDialog/>
                                        </Grid>
                                    </>
                                    : <FollowBtn user={user}/>
                            }
                        </div>
                        <Grid className="follow_btn">
                            {user?.followers?.length} Friends
                        </Grid>

                        <Typography variant="h5">{user?.firstName} <span
                            className={classes.danger}>{user?.mobile}</span></Typography>
                        <Typography variant="h6">{user?.address}</Typography>
                        <Typography variant="h6">{user?.email}</Typography>
                        <a href='https://www.facebook.com' target="_blank" rel="noreferrer">
                            {user?.website}
                        </a>
                        <p>{user?.story}</p>
                    </Grid>
                    { user?.id !== auth?.user.id ? user?.posts.map(u => {
                        return <div className="posts" key={u.id}>
                            <PostCard key={u.id} post={u} theme={u}/>
                        </div>
                    }) : null }
                    { onEdit && <EditProfile setOnEdit={setOnEdit} /> }
                    { showFollowers &&
                    <Followers
                        users={user.followers}
                        setShowFollowers={setShowFollowers}
                    /> }
                    { showFollowing &&
                    <Following
                        users={user.following}
                        setShowFollowing={setShowFollowing}
                    /> }
                </Grid> }
        </Grid>
    )
}

export default Info;
