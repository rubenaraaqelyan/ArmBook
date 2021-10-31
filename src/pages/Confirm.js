import React, { useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {useDispatch} from 'react-redux';
import { changePassword } from '../store/auth/action';

const Confirm = () => {
    const dispatch = useDispatch();
    const [password, setPassword] = useState();
    const match = useRouteMatch();

    return (
        <div>
            <TextField
                onChange={(ev) => setPassword(ev.target.value)}
                autoFocus
                margin="dense"
                id="name"
                label="password"
                type="password"
                fullWidth
            />
            <Button color="primary" onClick={() => dispatch(changePassword(match.params.key, password))}>
                Send
            </Button>
        </div>
    )
}

export default Confirm;
