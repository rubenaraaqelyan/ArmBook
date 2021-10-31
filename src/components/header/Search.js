import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import LoadIcon from '../../assets/images/loading.gif';
import { alpha, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import { searchUsersRequest } from '../../store/serchUser/action';
import usePrevious from '../../utils/hooks/usePrevious';
import AuthComplete from './AutoComplete.js';
import { useLocation } from 'react-router';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(2),
            width: '25ch',
        },
    },
    icon: {
        width: '35px',
        height: '35px'
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    loading: {
        width: '30px',
        height: '30px'
    }
}));

const Search = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const location = useLocation();
    const [search, setSearch] = useState('');
    const [users, setUsers] = useState([]);
    const [load, setLoad] = useState(false);

    const {isSearchingUsersSuccess, usersList} = useSelector(state => state.search);
    const prevIsSearchingUsersSuccess = usePrevious(isSearchingUsersSuccess);

    useEffect(() => {
        if (isSearchingUsersSuccess && prevIsSearchingUsersSuccess === false) {
            setUsers(usersList);
            setLoad(false);
        }
    }, [isSearchingUsersSuccess]);

    const changeInput = async (value) => {
        setSearch(value);
        setLoad(true);
        dispatch(searchUsersRequest(value));
    }

    return (
        <form className={classes.root}
              noValidate autoComplete="off">
            <div className={classes.search}>
                <div className={classes.searchIcon}>
                    <SearchIcon/>
                </div>
                <AuthComplete search={search} users={users} removeSearch={setSearch} changeInput={changeInput} />
                { load && <img className={classes.loading} src={LoadIcon} alt="loading"/> }
            </div>
        </form>
    )
}

export default Search;
