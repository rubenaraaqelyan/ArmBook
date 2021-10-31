import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    middle:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        margin:'25px 0'
    }
}));

const LoadMoreBtn = ({handleLoadMore}) => {
    const classes = useStyles();

    return (
        <div className={classes.middle}>
            <Button variant="contained"
                    color="primary"
                    onClick={handleLoadMore}>
                Load more
            </Button>
        </div>
    )
}

export default LoadMoreBtn;
