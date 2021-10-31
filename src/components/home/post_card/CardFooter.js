import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Send from '../../../assets/images/send.svg';
import LikeButton from '../../LikeButton';
import { useSelector, useDispatch } from 'react-redux';
import { likePost, unLikePost, getPosts } from '../../../store/post/action';
import ShareModal from '../../ShareModal';
import { BASE_URL } from '../../../utils/Config';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    items: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    likes: {
        padding: '0 25px',
        cursor: 'pointer'
    }
}));


const CardFooter = ({post}) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [loadLike, setLoadLike] = useState(false);
    const [isShare, setIsShare] = useState(false);
    const {auth, theme} = useSelector(state => state);


    const handleLike = async () => {
        if (loadLike) return;

        setLoadLike(true);
        await dispatch(likePost({post, auth,})).then(async () => await dispatch(getPosts()));
        setLoadLike(false);
    }

    const handleUnLike = async () => {
        if (loadLike) return;

        setLoadLike(true);
        await dispatch(unLikePost({post, auth,})).then(async () => await dispatch(getPosts()));
        setLoadLike(false);
    }


    const x = post?.likePost?.filter((v) => v.userId === auth.user.id);

    return (
        <Grid item lg={12} className={classes.container}>
            <div className="card_icon_menu">
                <div>
                    <LikeButton
                        isLike={x?.length > 0}
                        handleLike={handleLike}
                        handleUnLike={handleUnLike}
                    />
                    <Link to={`/post/${post.id}`} className="text-dark">
                        <i className="far fa-comment"/>
                    </Link>
                    <img src={Send} alt="Send" onClick={() => setIsShare(!isShare)}/>
                </div>
            </div>

            <div className={classes.items}>
                <Typography
                    variant="h6"
                    className={classes.likes}>
                    {post && post.likePost?.length} likes
                </Typography>
                <Typography
                    variant="h6"
                    className={classes.likes}>
                    {post.comments?.length} comments
                </Typography>
            </div>
            { isShare && <ShareModal url={`${BASE_URL}/post/${post.id}`} theme={theme}/> }
        </Grid>
    )
}

export default CardFooter;
