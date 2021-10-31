import React, { useState } from 'react';
import PostCard from '../PostCard';
import EditProfile from './EditProfile';
import FollowBtn from '../FollowBtn';
import Avatar from '../Avatar';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';



const InfoSecond = ({isFriend, auth, profile}) => {

    const [onEdit, setOnEdit] = useState(false);

    return (
        <>
            {profile?.users?.map((user, index) => (
                <div className="center" key={user.id}>
                    {user.id !== auth.user?.id ? <>
                        <div key={user.id}>
                            <Typography variant="h4">{user?.firstName}</Typography>
                            <Typography variant="h4">{user?.lastName}</Typography>
                            <Avatar src={user?.avatar} size="supper-avatar" /><br />
                            <FollowBtn isFriend={isFriend} user={user || ''}/>
                        </div>
                        {user?.posts?.map(u => {
                            return <div className="posts" key={u.id}>
                                <PostCard key={u?.id} post={u || ''} theme={u || ''}/>
                            </div>
                        })}
                        </> : null}
                    { onEdit && <EditProfile setOnEdit={setOnEdit}/> }
                </div>
            ))}
        </>
    )
}

InfoSecond.propTypes = {
    profile: PropTypes.object,
    auth: PropTypes.any,
}


export default InfoSecond;
