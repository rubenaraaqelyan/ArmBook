import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { resetPassword } from '../../store/auth/action';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    danger:{
        color:'red'
    },
    right:{
        marginLeft:'25px'
    }
}));

export default function FormDialog() {

    const classes = useStyles();
    const dispatch = useDispatch()
    const [open, setOpen] = React.useState(false);
    const [email, setEmail] = React.useState();


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        dispatch( resetPassword(email));
    };

    return (
        <div>
            <Button variant="outlined"
                    color="primary"
                    onClick={handleClickOpen}
                    className={classes.right}>
                Enter your email
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
                <DialogContent>
                    <TextField
                        onChange={(ev) => setEmail(ev.target.value)}
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Email Address"
                        type="email"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        handleClose();
                    }}
                            color="primary">
                        Send
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
