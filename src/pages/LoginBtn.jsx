import * as React from 'react';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    form:{
        width:'425px'
    },
    input:{
        width:'400px',
        marginTop:'15px',
    },
    btn:{
        width:'250px',
        marginLeft:'80px',
    },
    text:{
        marginLeft:'65px'
    },
    size:{
        marginTop:'25px'
    },
    top:{
        marginTop:'15px'
    },
    red:{
        color:'red'
    },
    gray:{
        color:'white'
    }
}));

export default function CircularIntegration({ loading, handleSubmit }) {
    const classes = useStyles();
    const timer = React.useRef();
    const [success, setSuccess] = React.useState(false);

    const buttonSx = {
        ...(success && {
            bgcolor: green[500],
            '&:hover': {
                bgcolor: green[700],
            },
        }),
    };

    React.useEffect(() => {
        return () => {
            clearTimeout(timer.current);
        };
    }, []);

    const handleButtonClick = (e) => {
            setSuccess(false);

            handleSubmit(e);

            timer.current = window.setTimeout(() => {
                setSuccess(true);
            }, 2000);

    };

    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ m: 1, position: 'relative' }}>
                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    size='large' fullWidth
                    sx={buttonSx}
                    disabled={loading}
                    className={classes.btn}
                    onClick={handleButtonClick}
                >
                    Login
                </Button>
                {loading && (
                    <CircularProgress
                        size={24}
                        sx={{
                            color: green[500],
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            marginTop: '-12px',
                            marginLeft: '-12px',
                        }}
                    />
                )}
            </Box>
        </Box>
    )
}
