import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from "prop-types";
import {Typography} from "@mui/material";
import moment from 'moment'
import DeleteIcon from '@material-ui/icons/Delete';
import { useDispatch } from 'react-redux';
import { deleteCommentRequest } from '../../store/posts/action';


const useStyles = makeStyles((theme) => ({
    comment:{
        cursor: 'pointer',
        color: 'crimson'
    },
    align:{
        display:'flex',
        flexDirection:'row',
        paddingLeft:'15px'
    },
    green:{
        color:'green',
        textAlign:'right',
        fontSize:'14px',
        paddingLeft:'15px'
    },
    icon:{
        color:'green',
        '&':{
                cursor:'pointer'
           }
    },
    author:{
        color:'lightgray',
        display:'flex',
        justifyContent:'flex-end',
        paddingRight:'15px'
    }
}));


const Comments = ({post}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [next, setNext] = useState(2);


    const deleteCommentHandler = (id) => {
        if (window.confirm("Are you sure want to delete this comment?")) {
            dispatch(deleteCommentRequest({id}));
        }
    }

    return (
        <div className={classes.comments}>
            { post?.commentPost?.map(comment => (
                <div key={comment.id}>
                <Typography variant="h6" className={classes.align}>{comment.content}</Typography>
                <Typography variant="h7" className={classes.green}>{moment(comment.createdAt).fromNow()}</Typography>
                    <DeleteIcon className={classes.icon} onClick={() => deleteCommentHandler(comment.id)} />
                    <Link to={`/search/user/${comment?.User?.id}`} >
                        <Typography variant="h7">{comment?.User?.email}</Typography>
                    </Link>
                </div>
                )) }

            { post.commentPost?.length - next > 0
                    ? <div onClick={() => setNext(next + 10)} className={classes.comment}>
                        See more comments...
                    </div>

                    : post.commentPost?.length > 2 &&
                    <div onClick={() => setNext(2)} className={classes.comment}>
                        Hide comments...
                    </div> }
        </div>
    )
}


Comments.propTypes = {
    post: PropTypes.object,
}

export default Comments;
