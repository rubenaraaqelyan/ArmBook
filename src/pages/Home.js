import React, { useEffect } from 'react';
import Status from '../components/home/Status';
import Posts from '../components/home/Posts';
import RightSideBar from '../components/home/RightSideBar';
import { useSelector } from 'react-redux';
import LoadIcon from '../assets/images/loading.gif';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { getUserData } from '../store/auth/action';
import { getPosts } from '../store/post/action';
import {getSendedFollowings} from "../store/suggestion/action";
import { getSuggestions } from '../store/suggestion/action';
import { useDispatch } from 'react-redux';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles((theme) => ({
    auto:{
        display:'block',
        margin:"auto"
    },
    left:{
        marginLeft:'35px'
    },
    center:{
        textAlign:'center',
    }

}));


let scroll = 0;

const Home = () => {
    const classes = useStyles();
    const dispatch= useDispatch();
    const { homePosts } = useSelector(state => state);


    useEffect(() => {
        const token = localStorage.getItem("access_token");
        if (token) {
            dispatch(getPosts());
            dispatch(getSuggestions());
            dispatch(getSendedFollowings());
        } else dispatch(getUserData());
    }, []);


    window.addEventListener('scroll', () => {
        if(window.location.pathname === '/'){
            scroll = window.pageYOffset
            return scroll;
        }
    });

    useEffect(() => {
        setTimeout(() => {
            window.scrollTo({top: scroll, behavior: 'smooth'});
        }, 100);
    },[]);

    return (
        <Grid className="home row mx-0">
            <Grid item lg={7} className={classes.left}>
                <Status />
                { homePosts?.loading
                        ? <img src={LoadIcon} alt="loading" className={classes.auto} />
                        : (homePosts.result === 0 && homePosts?.posts?.length === 0)
                        ? <Typography variant="h2" className={classes.center}>No Post</Typography>
                        : <Posts /> }
            </Grid>
            <Grid item lg={3} className={classes.left}>
                <RightSideBar />
            </Grid>
        </Grid>
    )
}

export default Home;
