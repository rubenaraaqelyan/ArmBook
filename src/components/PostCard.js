import React from 'react';
import CardHeader from './home/post_card/CardHeader';
import CardBody from './home/post_card/CardBody';
import CardFooter from './home/post_card/CardFooter';
import Comments from './home/Comments';
import InputComment from './home/InputComment';
import Card from '@mui/material/Card';


const PostCard = ({post, theme, addComment}) => {
    return (
        <div>
            <Card sx={{maxWidth: 945, marginTop: '45px'}}>
                <CardHeader post={post}/>
                <CardBody post={post} theme={theme}/>
                <CardFooter post={post}/>
                <InputComment addComment={addComment} post={post}/>
                <Comments post={post}/>
            </Card>
        </div>
    )
}


export default PostCard;
