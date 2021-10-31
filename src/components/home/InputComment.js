import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Icons from '../Icons';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { createCommentRequest } from '../../store/posts/action';


const useStyles = makeStyles((theme) => ({
    items:{
        display:'flex',
        justifyContent:'space-between'
    }
}));

const InputComment = ({children, post, onReply, setOnReply}) => {

    const dispatch = useDispatch();
    const classes = useStyles();
    const [content, setContent] = useState('');

    const { auth, theme } = useSelector(state => state);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createCommentRequest({content, postId: post.id}));
        setContent('');
        if(setOnReply) return setOnReply(false);
    }

    return (
        <form className="card-footer comment_input"
              onSubmit={handleSubmit}>
              {children}
            <input type="text"
                   placeholder="Add your comments..."
                   value={content}
                   onChange={e => setContent(e.target.value)}
            style={{
                filter: theme ? 'invert(1)' : 'invert(0)',
                color: theme ? 'white' : '#111',
                background: theme ? 'rgba(0,0,0,.03)' : '',
            }} />
            <Icons
                setContent={setContent}
                content={content}
                theme={theme} />
            <Button type="submit"
                    color="primary"
                    className="postBtn"
            >
                Post
            </Button>
        </form>
    )
}

export default InputComment;
