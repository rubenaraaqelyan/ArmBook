import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { GLOBALTYPES } from '../../../store/actions/globalTypes';
import { deletePost, getPosts } from '../../../store/post/action';
import { BASE_URL } from '../../../utils/Config';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';


const useStyles = makeStyles((theme) => ({
    items: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    flex: {
        display: 'flex'
    },
    container:{
        marginLeft:'50px',
        marginTop:'15px'
    },
    p:{
        color:'red'
    },
}));

const CardHeader = ({post}) => {

    const history = useHistory();
    const classes = useStyles();
    const { auth } = useSelector(state => state);
    const dispatch = useDispatch();

    const handleEditPost = (postId) => {
        dispatch({type: GLOBALTYPES.STATUS, payload: {...post, onEdit: true, postId}});
    }

    const handleDeletePost = () => {
        if (window.confirm("Are you sure want to delete this post?")) {
            dispatch(deletePost({post, auth})).then(() => dispatch(getPosts()));
            return history.push("/");
        }
    }


    const handleCopyLink = () => {
        navigator.clipboard.writeText(`${BASE_URL}/post/${post.id}`);
    }
    return (
        <Grid container className={classes.container}>
            <div className={classes.flex}>
                <div className="card_name">
                    <Typography variant="h6" color="primary">
                        {post?.user?.firstName}
                        <p className={classes.p}>{post.content}</p>
                        <small className="text-muted">
                            {moment(post.createdAt).fromNow()}
                        </small><br/>
                        <Grid className="beg dropdown">
                <span className="material-icons beg point"
                      id="moreLink"
                      data-toggle="dropdown">
                      more_horiz
                </span>
                            <div className="dropdown-menu point">
                                <div>
                                    <div className="dropdown-item" onClick={() => handleEditPost(post.id)}>
                                        <span className="material-icons beg">create</span> Edit Post
                                    </div>
                                    <div className="dropdown-item" onClick={handleDeletePost}>
                                        <span className="material-icons beg">delete_outline</span> Remove Post
                                    </div>
                                </div>

                                <div className="dropdown-item" onClick={handleCopyLink}>
                                    <span className="material-icons beg">content_copy</span> Copy Link
                                </div>
                            </div>
                        </Grid>
                        <img src={post.image} className="same" onError={ev => {
                            ev.target.src = "/gettyimages-168346757_web.jpg"
                        }}/>
                    </Typography>
                </div>
            </div>
        </Grid>
    )
}


CardHeader.propTypes = {
    post: PropTypes.object,
}

export default CardHeader;
