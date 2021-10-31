import { combineReducers } from 'redux';
import auth from '../auth/reducer';
import alert from './alertReducer';
import theme from './themeReducer';
import profile from '../profile/reducer';
import status from './statusReducer';
import homePosts from '../post/reducer';
import modal from './modalReducer';
import detailPost from './detailPostReducer';
import discover from '../discover/reducer';
import suggestions from '../suggestion/reducer';
import socket from './socketReducer';
import notify from '../notify/reducer';
import message from '../message/reducer';
import online from './onlineReducer';
import call from './callReducer';
import peer from './peerReducer';
import post from '../post/reducer';
import search from '../serchUser/reducer';
import posts from '../posts/reducer';
import login from '../login/reducer';
import comment from '../comment/reducer';

export default combineReducers({
    auth,
    alert,
    theme,
    profile,
    status,
    homePosts,
    modal,
    detailPost,
    discover,
    suggestions,
    socket,
    notify,
    message,
    online,
    call,
    peer,
    post,
    search,
    posts,
    login,
})
