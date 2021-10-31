import React, { useEffect, useState } from 'react';
import InfoSecond from '../components/profile/InfoSecond';
import Posts from '../components/profile/Posts';
import Saved from '../components/profile/Saved';
import { useSelector, useDispatch } from 'react-redux';
import LoadIcon from '../assets/images/loading.gif';
import { getProfileUsers } from '../store/profile/action';
import { useParams } from 'react-router-dom';


const Profile = () => {
    const { profile, auth, suggestions } = useSelector(state => state);
    const dispatch = useDispatch();
    const { id } = useParams();
    const [isFriend, setIsFriend] = useState(false);

    useEffect(() => {
        suggestions.sended.forEach(user => {
            if (user.userId == id) {
                setIsFriend(true);
            } else {
                setIsFriend(false);
            }
        })
        suggestions.friends.forEach(user => {
            if (user.followerId === id) {
                setIsFriend(true);
            } else {
                setIsFriend(false);
            }
        })
    }, [suggestions]);

    const [saveTab, setSaveTab] = useState(false);


    useEffect(() => {
        if(profile.ids.every(item => item !== id)){
            dispatch(getProfileUsers({id, auth}));
        }
    },[id, auth, dispatch, profile.ids]);

    return (
        <div className="profile">
            <InfoSecond isFriend={isFriend} auth={auth} profile={profile} id={id} />
            { auth.user?.id === id &&
            <div className="profile_tab">
                <button className={saveTab ? '' : 'active'} onClick={() => setSaveTab(false)}>Posts</button>
                <button className={saveTab ? 'active' : ''} onClick={() => setSaveTab(true)}>Saved</button>
            </div> }

            { profile?.loading
                ? <img src={LoadIcon} alt="loading" />
                : <>
                    { saveTab
                        ?
                        <Saved auth={auth} dispatch={dispatch} />
                        :
                        <Posts auth={auth} profile={profile} dispatch={dispatch} id={id} /> }
                </>
            }
        </div>
    )
}

export default Profile;
