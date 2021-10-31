import React, {useEffect} from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import PageRender from './customRouter/PageRender';
import PrivateRouter from './customRouter/PrivateRouter';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import {useSelector, useDispatch} from 'react-redux';
import Peer from 'peerjs';
import { GLOBALTYPES } from './store/actions/globalTypes';
import Header from './components/header/Header';
import StatusModal from './components/StatusModal';
import Alert from './components/home/alert/Alert';
import { getUserData } from './store/auth/action';
import Profile from './pages/Profile';
import User from './pages/User';
import Confirm from './pages/Confirm';
import { getPosts } from './store/post/action';
import { getSendedFollowings, getSuggestions } from './store/suggestion/action';
import { getFriends } from './store/notify/action';
import Loading from './components/home/alert/Loading';


function App() {
    const dispatch = useDispatch();
    const { auth, status, modal } = useSelector(state => state);

    useEffect(() => {
        const token = localStorage.getItem("access_token");
        if (token) {
            dispatch(getUserData(true));
            dispatch(getPosts());
            dispatch(getSuggestions());
            dispatch(getSendedFollowings());
            dispatch(getFriends());
        } else dispatch(getUserData());
    }, []);

    useEffect(() => {
        const newPeer = new Peer(undefined, {
            path: '/', secure: true
        })

        dispatch({type: GLOBALTYPES.PEER, payload: newPeer})
    }, [dispatch]);

    return auth.authReady ? (
        <BrowserRouter>
            <Alert/>
            <div className={`App ${(status || modal) && 'mode'}`}>
                {auth.user && <Header/>}
                {status && <StatusModal/>}
                <Switch>
                    <Route exact path="/" component={auth.user ? Home : Login}/>
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/my/profile" component={Profile} />
                    <Route exact path="/search/user/:id" component={User} />
                    <Route exact path="/user/confirm/:key" component={Confirm} />
                    <PrivateRouter exact path="/:page" component={PageRender} />
                    <PrivateRouter exact path="/:page/:id" component={PageRender} />
                </Switch>
            </div>
        </BrowserRouter>
    ) : (<Loading/>);
}

export default App;
