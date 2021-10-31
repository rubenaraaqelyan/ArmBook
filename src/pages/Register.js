import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { register } from '../store/auth/action';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import '../styles/auth.css';
import makeStyles from '@material-ui/core/styles/makeStyles';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import valid from '../utils/Validation';
import FormHelperText from '@material-ui/core/FormHelperText';


const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
    input: {
        width: '400px',
        marginTop: '15px'
    },
    btn: {
        width: '250px',
        marginLeft: '80px'
    },
    gender:{
        marginTop:'15px'
    },
    red:{
        color:'red'
    },
    gray:{
        color:'gray'
    },
    top:{
        marginTop:'10px'
    },
    center:{
        textAlign:'center'
    }

}));

const Register = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const {auth, alert} = useSelector(state => state);

    const init = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        cf_password: '',
        gender: 'male'
    }
    const [userData, setUserData] = useState(init);
    const [typeCfPass, setTypeCfPass] = useState(false);
    const [isError, setIsError] = useState(false);

    const [values, setValues] = React.useState({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
    });

    const [touched, setTouched] = useState({
        firstName: false,
        lastName: false,
        email: false,
        password: false,
        cf_password: false,
        gender: 'male'
    })

    const handleBlurInput = e => {
        const {name} = e.target;
        const newTouched = {...touched};
        newTouched[name] = true;
        setTouched(newTouched)
    }

    useEffect(() => {
        const errors = valid(userData, touched);
        if (errors) {
            setIsError(errors);
        }
    },[userData, touched]);

    const {firstName, lastName, email, password, cf_password} = userData


    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    useEffect(() => {
        if (auth.token) history.push("/")
    }, [auth.token, history])


    const handleChangeInput = e => {
        const {name, value} = e.target;
        setUserData({...userData, [name]: value});
    }

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(register(userData, touched));
        history.push('/');
    }

    return (
        <Grid container justifyContent='center' alignItems='center' direction='column'>
            <form onSubmit={handleSubmit}>
                <Typography className={classes.center} variant='h2' component='h2' color='primary'>Armbook</Typography>
                <Grid item lg={12}>
                    <TextField type="text"
                               id="firstName"
                               name="firstName"
                               label="FirstName"
                               className={classes.input}
                               error={isError["firstName"]}
                               helperText="Please entry firstName!."
                               onBlur={handleBlurInput}
                               onChange={handleChangeInput} value={firstName}
                               style={{background: `${alert.firstName ? '#fd2d6a14' : ''}`}}/>

                    <small className="form-text text-danger">
                        {alert.firstName ? alert.firstName : ''}
                    </small>
                </Grid>
                <Grid item lg={12}>
                    <TextField type="text"
                               className={classes.input}
                               id="lastName"
                               name="lastName"
                               onChange={handleChangeInput}
                               onBlur={handleBlurInput}
                               value={lastName}
                               label="LastName"
                               error={isError["lastName"]}
                               helperText="Please entry lastName!."
                               style={{background: `${alert.lastName ? '#fd2d6a14' : ''}`}}/>

                    <small className="form-text text-danger">
                        {alert.lastName ? alert.lastName : ''}
                    </small>
                </Grid>
                <Grid item lg={12}>
                    <TextField type="email"
                               className={classes.input}
                               name="email"
                               label="Email address"
                               onChange={handleChangeInput}
                               onBlur={handleBlurInput}
                               value={email}
                               error={isError["email"]}
                               helperText="Please entry email!."
                               style={{background: `${alert.email ? '#fd2d6a14' : ''}`}}/>

                    <small className="form-text text-danger">
                        {alert.email ? alert.email : ''}
                    </small>
                </Grid>

                <Grid item>
                    <FormControl className={classes.size}>
                        <InputLabel htmlFor="standard-adornment-password" className={isError["password"] ? classes.red : classes.gray}>Password</InputLabel>
                        <Input
                            id="standard-adornment-password"
                            value={password}
                            className={classes.input}
                            type={ values.showPassword ? "text" : "password" }
                            name="password"
                            onChange={handleChangeInput}
                            onBlur={handleBlurInput}
                            error={isError["password"]}
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
                        {isError["password"] && <FormHelperText id="standard-weight-helper-text" className={classes.red}>Please entry correct password!</FormHelperText>}
                    </FormControl>
                </Grid>

                <Grid item lg={12}>
                    <div className="pass">
                        <TextField type={typeCfPass ? "text" : "password"}
                                   className={classes.input}
                                   id="cf_password"
                                   onChange={handleChangeInput}
                                   onBlur={handleBlurInput}
                                   value={cf_password}
                                   name="cf_password"
                                   label="Confirm Password"
                                   error={isError["cf_password"]}
                                   helperText="Please entry correct password!."
                                   style={{background: `${alert.cf_password ? '#fd2d6a14' : ''}`}}/>

                    </div>
                    <small className="form-text text-danger">
                        {alert.cf_password ? alert.cf_password : ''}
                    </small>
                </Grid>

                <Grid item lg={12} className="date">
                    <Typography className="same">Choose your Birthday!</Typography>
                    <TextField
                        id="date"
                        label="Birthday"
                        type="date"
                        defaultValue="2017-05-24"
                        className={classes.input}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Grid>

                <Grid item lg={12} className={classes.gender}>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Gender</FormLabel>
                        <RadioGroup aria-label="gender" name="gender1" style={{display: 'flex', flexDirection: 'row'}}>
                            <FormControlLabel value="male" control={<Radio size="small"/>} label="Male" defaultChecked
                                              onChange={handleChangeInput} id="male" name="gender"/>
                            <FormControlLabel value="female" control={<Radio size="small"/>} label="Female"
                                              defaultChecked
                                              onChange={handleChangeInput} id="female" name="gender"/>
                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Button variant="contained"
                        color="primary"
                        type="submit"
                        size='large'
                        className={classes.btn}
                        disabled={firstName && lastName && email && password ? false : true}
                        fullWidth>
                    Register
                </Button>
                <p className={classes.top}>
                    Already have an account? <Link to="/" style={{color: "crimson"}}>Login Now</Link>
                </p>
            </form>
        </Grid>
    )
}

export default Register;
