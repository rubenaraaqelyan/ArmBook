import * as React from 'react';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import UserCard from '../UserCard';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  color:{
      color:'white',
      paddingLeft:'5px',
      backgroundColor:'white'
  }

}));

export default function CountrySelect({users, changeInput,handleClose, search, removeSearch}) {
    const classes = useStyles();

    return (
        <Autocomplete
            id="country-select-demo"
            sx={{ width: 300 }}
            options={users}
            className={classes.color}
            autoHighlight
            getOptionLabel={(user) => user.firstName}
            renderOption={(props, user) => (
                <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                    <div className="users">
                            <UserCard
                                key={user.id}
                                user={user}
                                border="border"
                                handleClose={handleClose}
                                removeSearch={removeSearch}
                            />
                    </div>
                </Box>
            )}
            renderInput={(params) => (
                <TextField
                    {...params}
                    title="Enter to Search"
                    name="search"
                    className={classes.color}
                    onChange={(e) => changeInput(e.target.value)}
                    inputProps={{
                        ...params.inputProps,
                        value: search,
                        autoComplete: 'new-password',
                    }}
                />
            )}
        />
    );
}
