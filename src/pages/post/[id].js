import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getPost } from '../../store/post/action';
import LoadIcon from '../../assets/images/loading.gif';
import PostCard from '../../components/PostCard';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
   auto:{
       display:'block',
       margin:"auto"
   }

}));


const Post = () => {

    const classes = useStyles();
    const { id } = useParams();
    const dispatch = useDispatch();
    const [post, setPost] = useState([]);

    const { auth, detailPost } = useSelector(state => state);

    useEffect(() => {
        dispatch(getPost({detailPost, id, auth}));

        if(detailPost.length > 0){
            const newArr = detailPost.filter(post => post.id === id);
            setPost(newArr);
        }
    },[detailPost, dispatch, id, auth]);

    return (
        <div className="posts">
            {
                post.length === 0 &&
                <img src={LoadIcon} alt="loading" className={classes.auto} />
            }

            {
                post.map(item => (
                    <PostCard key={item.id} post={item} />
                ))
            }
        </div>
    )
}

export default Post;
