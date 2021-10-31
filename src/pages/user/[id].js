import React, { useEffect, useState } from 'react';
import Info from '../../components/profile/Info';
import Posts from '../../components/profile/Posts';
import Saved from '../../components/profile/Saved';
import { useSelector, useDispatch } from 'react-redux';
import LoadIcon from '../../assets/images/loading.gif';
import { getProfileUsers } from '../../store/profile/action';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    auto:{
        display:'block',
        margin:"auto"
    }

}));


const Profile = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { id } = useParams();
    const { profile, auth } = useSelector(state => state)
    const [saveTab, setSaveTab] = useState(false)

    useEffect(() => {
        if(profile.ids.every(item => item !== id)){
            dispatch(getProfileUsers({id, auth}))
        }
    },[id, auth, dispatch, profile.ids])

    return (
        <div className="profile">

            <Info auth={auth} profile={profile} dispatch={dispatch} id={id} />

            { auth.user.id === id &&
                <div className="profile_tab">
                    <button className={saveTab ? '' : 'active'} onClick={() => setSaveTab(false)}>Posts</button>
                    <button className={saveTab ? 'active' : ''} onClick={() => setSaveTab(true)}>Saved</button>
                </div> }

            { profile.loading
                    ? <img className={classes.auto} src={LoadIcon} alt="loading" />
                    : <>
                        {
                            saveTab
                                ? <Saved auth={auth} dispatch={dispatch} />
                                : <Posts auth={auth} profile={profile} dispatch={dispatch} id={id} /> }
                    </>
            }
        </div>
    )
}

export default Profile;
