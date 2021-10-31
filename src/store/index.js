import {fork, all} from 'redux-saga/effects';
import auth from './auth/sagas';
import discover from './discover/sagas';
import notify from './notify/sagas';
import post from './post/sagas';
import profile from './profile/sagas';
import suggestion from './suggestion/sagas';
import search from './serchUser/sagas';
import posts from './posts/sagas';
import login from './login/sagas';


export default function* watchers() {
    return yield all([
        auth,
        discover,
        notify,
        post,
        profile,
        suggestion,
        search,
        posts,
        login,
    ].map(fork))
}
