import React from 'react';
import Info from '../components/profile/Info';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';


const Profile = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const { profile, auth } = useSelector(state => state);

    return (
        <div className="profile">
            <Info auth={auth} profile={profile} dispatch={dispatch} id={id} />
        </div>
    )
}

export default Profile;
