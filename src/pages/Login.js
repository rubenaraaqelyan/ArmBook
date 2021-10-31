import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { login } from '../store/auth/action';
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import '../styles/auth.css';
import makeStyles from '@material-ui/core/styles/makeStyles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import valid from '../utils/Validation';
import FormHelperText from '@material-ui/core/FormHelperText';
import { SetLoginBtn_ActionCreator } from '../store/auth/reducer.js';
import LoginBtn from './LoginBtn';
import Alert from '@mui/material/Alert';



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
        marginTop:'25px'
    },
    text:{
        textAlign:'center'
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

const Login = () => {
    const classes = useStyles();
    const {auth} = useSelector(state => state);
    const dispatch = useDispatch();
    const history = useHistory();
    const [isError, setIsError] = useState({})
    const [values, setValues] = useState({
        showPassword: false,
    });


    const [touched, setTouched] = useState({
        amount: false,
        password: false,
        weight: false,
        weightRange: false
    })

    const handleBlurInput = e => {
        const {name} = e.target;
        const newTouched = { ...touched};
        newTouched[name] = true;
        setTouched(newTouched)
    }

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const initialState = {email: '', password: ''}
    const [userData, setUserData] = useState(initialState);
    const {email, password} = userData

    useEffect(() => {
        dispatch(SetLoginBtn_ActionCreator(false));
    }, [])

    useEffect(() => {
        if (auth.token) history.push("/")
    }, [auth.token, history])

    const handleChangeInput = e => {
        const {name, value} = e.target;
        setUserData({...userData, [name]: value});
        const errors = valid({...userData, [name]: value}, touched);
        if (!errors) {
            setUserData({...userData, [name]: value});
        } else {
            setIsError(errors);
        }
    };

    useEffect(() => {
        const errors = valid(userData, touched);
        if (errors) {
            setIsError(errors);
        }
    }, [userData])

    const handleSubmit = e => {
        e.preventDefault()
        dispatch(login(userData));
    }

    return (
        <Grid container justifyContent='center' alignItems='center' direction='column'>
            <form onSubmit={handleSubmit} autoComplete="off" className={classes.form}>
                <Typography className={classes.text}
                            variant='h2'
                            component='h2'
                            color='primary'>Armbook
                </Typography>
                <Grid item lg={12}>
                    <TextField type="email" name="email"
                                label="Email address"
                                className={classes.input}
                                onChange={handleChangeInput}
                                onBlur={handleBlurInput}
                                value={email}
                                error={isError['email']}
                                helperText="Please entry email!"
                         />
                </Grid>
                <Grid item>
                        <FormControl className={classes.size}>
                            <InputLabel htmlFor="standard-adornment-password" className={isError['password'] ? classes.red : classes.gray}>Password</InputLabel>
                            <Input
                                id="standard-adornment-password"
                                value={password}
                                label="Password"
                                className={classes.input}
                                type={ values.showPassword ? "text" : "password" }
                                name="password"
                                error={isError['password']}
                                onChange={handleChangeInput}
                                onBlur={handleBlurInput}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                        >
                                            {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                            <FormHelperText id="standard-weight-helper-text" className={isError['password'] ? classes.red : classes.gray}>Please entry correct password!</FormHelperText>
                        </FormControl>
                </Grid>
                { auth.authErrorMsg && <Alert severity="error">
                        {
                            auth.authErrorMsg && <p className={classes.red}> {auth.authErrorMsg} </p>
                        }
                    </Alert> }
                <LoginBtn loading={auth.loginBtnStatus} handleSubmit={handleSubmit} />
                <p className={classes.top}>
                    You don't have an account? <Link to="/register" style={{color: "crimson"}}>Register Now</Link>
                </p>
            </form>
        </Grid>
    )
}

export default Login;
