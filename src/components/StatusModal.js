import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { GLOBALTYPES } from '../store/actions/globalTypes';
import { createPost, getPosts, updatePost } from '../store/post/action';
import Icons from './Icons';
import { imageShow, videoShow } from '../utils/ShowMedia';
import {Button} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    flex:{
        display:'flex'
    },
    relative:{
        position:'relative'
    },
    img:{
        overflow:'hidden'
    }

}));

const StatusModal = () => {
    const classes = useStyles();
    const videoRef = useRef();
    const refCanvas = useRef();
    const { auth, theme, status } = useSelector(state => state);
    const dispatch = useDispatch();

    const [content, setContent] = useState({});
    const [images, setImages] = useState(null);
    const [stream, setStream] = useState(false);
    const [tracks, setTracks] = useState('');
    const {posts} = useSelector(state => state.post);

    const handleChangeImages = e => {
        const files = e.target.files
        let err = ""

        if (err) {
            dispatch({type: GLOBALTYPES.ALERT_FAIL, payload: {error: err}})
        } else {
            setContent({...content, image: files[0]})
            setImages(files[0])
        }
    }

    const deleteImages = (index) => {
        const newArr = [...images]
        newArr.splice(index, 1);
        setImages(newArr);
    }

    const changeModalHandler = () => {
        dispatch({
            type: GLOBALTYPES.STATUS, payload: false
        })
    }


    const handleStopStream = () => {
        tracks.stop();
        setStream(false);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (status.onEdit) {
            dispatch(updatePost({content, auth, status})).then(() => dispatch(getPosts()));
        } else {
            dispatch(createPost({content, images, auth})).then(() => dispatch(getPosts()));
        }

        setContent({})
        setImages(null)
        if (tracks) tracks.stop()
        dispatch({type: GLOBALTYPES.STATUS, payload: false});
    }

    useEffect(() => {
        if(status.onEdit){
            setContent(status.content);
        }
    },[status]);

    return (
        <Grid className="status_modal">
            <form onSubmit={handleSubmit}>
                <div className="status_header">
                    <h5>Create or Update Post</h5>
                    <span onClick={changeModalHandler}>
                        &times;
                    </span>
                </div>

                <div className="status_body">
                  <textarea name="content" value={content.content}
                            placeholder={`${auth.user.lastName}, what are you thinking?`}
                            onChange={e => setContent({...content, content: e.target.value})}
                            className={classes.textarea}
                            style={{
                                filter: theme ? 'invert(1)' : 'invert(0)',
                                color: theme ? 'white' : '#111',
                                background: theme ? 'rgba(0,0,0,.03)' : '',
                            }}/>

                    <Grid className={classes.flex}>
                        <div className="flex-fill"/>
                        <Icons setContent={setContent} content={content} theme={theme} />
                    </Grid>
                    <div className="show_images"
                         className={classes.img}>
                        <img src={images ? URL.createObjectURL(content.image) : ''} alt="add photo"
                             onError={ev => {
                                 ev.target.src = "/img_avatar.png"
                             }}
                             className="fix"/>
                        {
                            false && images.map((img, index) => (
                                <div key={index} id="file_img">
                                    {
                                        img.camera ? imageShow(img.camera, theme)
                                            : img.url
                                            ?<>
                                                {
                                                    img.url.match(/video/i)
                                                        ? videoShow(img.url, theme)
                                                        : imageShow(img.url, theme)
                                                }
                                            </>
                                            :<>
                                                {
                                                    img.type.match(/video/i)
                                                        ? videoShow(URL.createObjectURL(img), theme)
                                                        : imageShow(URL.createObjectURL(img), theme)
                                                }
                                            </>
                                    }
                                    <span onClick={() => deleteImages(index)}>&times;</span>
                                </div>
                            ))
                        }
                    </div>

                    {
                        stream &&
                        <div className={classes.relative}>
                            <video autoPlay muted ref={videoRef} width="100%" height="100%"
                                   style={{filter: theme ? 'invert(1)' : 'invert(0)'}} />

                            <span onClick={handleStopStream}>&times;</span>
                            <canvas ref={refCanvas} style={{display: 'none'}} />
                        </div>
                    }
                    <div className="input_images">
                        {
                            stream
                                ? <i className="fas fa-camera"  />
                                : <>
                                    <i className="fas fa-camera"  />

                                    <div className="file_upload">
                                        <i className="fas fa-image" />
                                        <input type="file" name="file" id="file"
                                               multiple accept="image/*,video/*" onChange={handleChangeImages} />
                                    </div>
                                </>
                        }

                    </div>
                </div>
                <div className="status_footer">
                    <Button variant="contained"
                            color="primary"
                            type="submit">
                        Post
                    </Button>
                </div>
            </form>
        </Grid>
    )
}

export default StatusModal;
