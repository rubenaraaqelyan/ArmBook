import React, { useState, useEffect } from 'react';
import PostThumb from '../PostThumb';
import LoadIcon from '../../assets/images/loading.gif';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    auto: {
        display: 'flex',
        margin: 'auto'
    }
}));

const Posts = () => {
    const classes = -useStyles();
    const [posts, setPosts] = useState([]);
    const [result, setResult] = useState(0);
    const [load, setLoad] = useState(false);

    useEffect(() => {
        setResult(result)
    }, [result])

    return (
        <div>
            { posts?.length > 1 && <PostThumb posts={posts} result={result}/> }

            { load && <img src={LoadIcon} alt="loading" className={classes.auto}/> }

        </div>
    )
}

export default Posts;
