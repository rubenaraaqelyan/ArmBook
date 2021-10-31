    import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PostCard from '../PostCard';
import LoadIcon from '../../assets/images/loading.gif';
import LoadMoreBtn from '../LoadMoreButton';
import { makeStyles } from '@material-ui/core/styles';
import { deletePostsRequest, addPost_ActionCreatorRequest } from '../../store/posts/action';
import point from "../../assets/images/point.jpg";

const useStyles = makeStyles((theme) => ({
    auto: {
        display: 'flex',
        margin: 'auto'
    },
    point:{
        width:'100px',
        height:'80px',
        marginTop:'30px',
        marginLeft:'50%'
    }

}));


const Posts = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [load, setLoad] = useState(false);
    const [result, setResult] = useState(0);

    const {homePosts, auth, theme} = useSelector(state => state);
    const {isGettingPostsSuccess,isDeletePostsSuccess, posts, page, count} = useSelector(state => state.posts);

    useEffect(() => {
        if (isGettingPostsSuccess) {
            setResult(posts?.length);
            setLoad(false);
        }
    }, [isGettingPostsSuccess]);

    useEffect(() => {
        if (isDeletePostsSuccess){
            dispatch(deletePostsRequest(posts));
        }
    },[isDeletePostsSuccess]);


    useEffect(() => {
        setLoad(false);
    }, [posts?.length]);

    const handleLoadMore = async () => {
        setLoad(true);
        dispatch(addPost_ActionCreatorRequest({page}));
    }

    return (
        <div className="posts">
            { posts && posts.map(post => (
                <PostCard key={post.id} post={post} theme={theme}/>
            ))}

            { load && <img src={LoadIcon} alt="loading" className={classes.auto}/> }

            { posts?.length < count ? <LoadMoreBtn
                        result={homePosts.result}
                        page={homePosts.page}
                        load={load}
                        handleLoadMore={handleLoadMore}/> : <img src={point} className={classes.point} /> }
        </div>
    )
}

export default Posts;
