import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateProfileUser } from '../../store/profile/action';
import { Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import { useHistory } from 'react-router-dom';


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
        marginTop:'15px'
    },
    btn:{
        width:'250px',
        marginLeft:'80px'
    },
    text:{
        marginLeft:'25px'
    },
    relative:{
        position:'relative'
    },
    danger:{
        color:'red',
        position:'absolute',
        top: '50%',
        right: '5px',
        transform: 'translateY(-50%)'
    },
    avatar:{
        width:'410px',
        height:'300px'
    }
}));


const EditProfile = () => {

    const init = {
        firstName: '',
        lastName: '',
        mobile: '',
        address: '',
        website: '',
        story: '',
        gender: ''
    }

    const history = useHistory();
    const classes = useStyles();
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [userData, setUserData] = useState(init);
    const [avatar, setAvatar] = useState('');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const {firstName,lastName, mobile, address, website, story, gender} = userData

    const {auth, theme} = useSelector(state => state);

    useEffect(() => {
        setUserData(auth.user);
    }, [auth.user])


    const changeAvatar = (e) => {
        const file = e.target.files[0]

        setAvatar(file);
        setUserData({...userData, avatar: file});
    }

    const handleInput = e => {
        const {name, value} = e.target
        setUserData({...userData, [name]: value});
    }

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(updateProfileUser({userData, auth}));
        history.push('/');
    }
    return (
        <Grid>
            <Button variant="outlined" color="secondary" onClick={handleClickOpen}>
                Edit Profile
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Edit</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit}>
                        <div className="info_avatar">
                            <img src={avatar ? URL.createObjectURL(avatar) : `${auth?.user?.avatar}`}
                                 className={classes.avatar}
                                 onError={ev => {
                                     ev.target.src = "/img_avatar.png"
                                 }}
                                 alt="avatar" style={{filter: theme ? 'invert(1)' : 'invert(0)'}}/>
                            <span>
                        <p>Change</p>
                        <input type="file" name="file" id="file_up"
                               accept="image/*" onChange={changeAvatar}/>
                    </span>
                        </div>
                        <Grid item>
                            <div className={classes.relative}>
                                <TextField
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    value={firstName}
                                    label="FirstName"
                                    className={classes.input}
                                    onChange={handleInput}/>
                                <small className={classes.danger}
                                >
                                    {firstName?.length}/25
                                </small>
                            </div>
                        </Grid>

                        <Grid item>
                            <div className={classes.relative}>
                                <TextField
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    value={lastName}
                                    label="lastName"
                                    className={classes.input}
                                    onChange={handleInput}/>
                                <small className={classes.danger}>
                                    {firstName?.length}/25
                                </small>
                            </div>
                        </Grid>

                        <Grid item>
                            <div className={classes.relative}>
                                <TextField
                                    type="text"
                                    id="mobile"
                                    name="mobile"
                                    value={mobile}
                                    label="Mobile"
                                    className={classes.input}
                                    onChange={handleInput}/>
                            </div>
                        </Grid>

                        <Grid item>
                            <div className={classes.relative}>
                                <TextField
                                    type="text"
                                    id="address"
                                    name="address"
                                    value={address}
                                    label="Address"
                                    className={classes.input}
                                    onChange={handleInput}/>
                            </div>
                        </Grid>

                        <Grid item>
                            <div className={classes.relative}>
                                <TextField
                                    type="text"
                                    id="website"
                                    name="website"
                                    value={website}
                                    label="Website"
                                    className={classes.input}
                                    onChange={handleInput}/>
                            </div>
                        </Grid>

                        <div>
                            <label htmlFor="story">Story</label>
                            <textarea
                                name="story"
                                value={story} cols="30" rows="4"
                                className="form-control"
                                onChange={handleInput}/>
                        </div>

                        <label htmlFor="gender">Gender</label>
                        <div className="input-group-prepend px-0 mb-4">
                            <select name="gender" id="gender" value={gender}
                                    className="custom-select text-capitalize"
                                    onChange={handleInput}>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>
                        <Button variant="contained" color="primary" type="submit">Save</Button>
                    </form>
                </DialogContent>
            </Dialog>
        </Grid>
    )
}

export default EditProfile;


