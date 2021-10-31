import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import { useDispatch, useSelector } from 'react-redux';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Grid } from '@mui/material';


const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

const useStyles = makeStyles((theme) => ({
    flex:{
        display:'flex',
        flexDirection:'column',
        marginTop:'30px'
    },
    all:{
        flexWrap:'wrap',
    }
}));

export default function RecipeReviewCard() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const {auth, suggestions} = useSelector(state => state);


    return (
        <Grid className={classes.all}>
            { suggestions?.friends?.length ?
            suggestions?.friends?.map((friend, key) => (
                <Card className={classes.flex} key={key}>
                <CardHeader
                avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe" key={friend.id}>
                    {friend?.followersUser?.firstName}
                </Avatar>
            }
                action={
                <IconButton aria-label="settings">
                </IconButton>
            }
                title={friend?.followersUser?.firstName}
                subheader={friend?.followersUser?.lastName}
                />
                <CardMedia
                    key={friend.id}
                    component="img"
                    height="194"
                    image={friend?.followersUser?.avatar || 'img_avatar.png'}
                    onError={ev => {
                        ev.target.src = "/img_avatar.png"
                    }}
                    alt="Paella dish"
                />
                <CardContent>
                <Typography variant="body2" color="text.secondary" key={friend.id}>
                    {friend?.followersUser?.firstName}
                </Typography>
                </CardContent>
                </Card>
            )) : <Typography variant="h5" color="primary">I have no friends yet!!!)</Typography> }
        </Grid>
    );
}
