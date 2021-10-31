import React from 'react';
import { useSelector } from 'react-redux';

const Avatar = ({src, size}) => {
    const {theme} = useSelector(state => state)

    return (
        <img src={src ? src : 'https://upload.wikimedia.org/wikipedia/commons/a/a0/Pierre-Person.jpg'} className={size}
           style={{filter: `${theme ? 'invert(1)' : 'invert(0)'}`}}/>
    )
}

export default Avatar;
