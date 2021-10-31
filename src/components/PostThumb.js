import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';


const useStyles = makeStyles((theme) => ({
    center:{
        textAlign:'center',
        color:'red'
    }

}));

const PostThumb = ({posts, result}) => {
    const classes = useStyles()
    const { theme } = useSelector(state => state)

    if(result === 0) return <Typography variant="h3" className={classes.center}>No Post</Typography>

    return (
        <Grid container className="post_thumb">
            { posts?.rows?.map(post => (
                    <Link key={post.id} to={`/post/${post.id}`}>
                        <div className="post_thumb_display">
                            { post.images[0].url.match(/video/i)
                                    ?<video controls src={post.images[0].url}
                                            style={{filter: theme ? 'invert(1)' : 'invert(0)'}} />

                                    :<img src={post.images[0].url} alt={post.images[0].url}
                                          style={{filter: theme ? 'invert(1)' : 'invert(0)'}} />
                            }
                            <div className="post_thumb_menu">
                                <i className="far fa-heart">{post.likes.length}</i>
                                <i className="far fa-comment">{post.comments.length}</i>
                            </div>
                        </div>
                    </Link>
                ))
            }
        </Grid>
    )
}

PostThumb.propTypes = {
    posts: PropTypes.array,
    result: PropTypes.number,
}

export default PostThumb;
