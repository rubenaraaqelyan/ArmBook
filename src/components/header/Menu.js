import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/auth/action';
import { GLOBALTYPES } from '../../store/actions/globalTypes';
import Avatar from '../Avatar';
import NotifyModal from '../NotifyModal';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';

const useStyles = makeStyles(() => ({

}));

const navLinks = [
    { label: 'Home', icon: 'home', path: '/'},
    { label: 'Discover', icon: 'explore', path: '/friends'}
]

const Menu = () => {
    const dispatch = useDispatch();
    const { pathname } = useLocation();
    const classes = useStyles();

    const { auth, theme, notify,suggestions } = useSelector(state => state);

    const isActive = (pn) => pn === pathname ? 'active' : ''

    const logoutHandler = () => {
        dispatch(logout())
    }

    return (
        <Grid container item lg={12} className="menu">
            <ul className="icons">
                {navLinks.map((link, index) => (
                    <li className={`nav-item ${isActive(link.path)}`} key={index}>
                        <Link className="nav-link" to={link.path}>
                            <span className="material-icons">{link.icon}</span>
                        </Link>
                    </li>
                ))}

                <li className="nav-item dropdown">
                    <span className="nav-link position-relative" id="navbarDropdown"
                    role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <NotificationsActiveIcon className="material-icons"
                        style={{color: notify.data.length > 0 ? 'crimson' : ''}}>
                            favorite
                        </NotificationsActiveIcon>
                        <span className="notify_length">{suggestions.users.length}</span>
                    </span>
                    <div className="dropdown-menu" style={{marginRight:'100px'}}>
                        <NotifyModal />
                    </div>
                </li>
                <li className="dropdown">
                    <span className="nav-link dropdown-toggle" id="navbarDropdown"
                    role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <Avatar src={auth.user?.avatar } size="medium-avatar"/>
                    </span>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown" style={{marginRight:'80px'}}>
                    <Link className="dropdown-item" to={`/my/profile`}>Profile</Link>
                    <div className="dropdown-divider"/>
                    <Link className="dropdown-item" to="/"
                    onClick={logoutHandler}>
                        Logout
                    </Link>
                </div>
            </li>
        </ul>
    </Grid>
    )
}

export default Menu;
