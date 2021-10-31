import { GLOBALTYPES } from '../actions/globalTypes';
import { postDataAPI, getDataAPI, deleteDataAPI, putDataAPI } from '../../utils/Api';
import { createNotify, removeNotify } from '../notify/action';
import toFormData from 'object-to-formdata';

export const POST_TYPES = {
    CREATE_POST_REQUEST: 'CREATE_POST_REQUEST',
    CREATE_POST_SUCCESS: 'CREATE_POST_SUCCESS',
    CREATE_POST_FAIL: 'CREATE_POST_FAIL',
    LOADING_POST_REQUEST: 'LOADING_POST_REQUEST',
    LOADING_POST_SUCCESS: 'LOADING_POST_SUCCESS',
    LOADING_POST_FAIL: 'LOADING_POST_FAIL',
    GET_POSTS_REQUEST: 'GET_POSTS_REQUEST',
    ADD_POST_REQUEST: 'ADD_POST_REQUEST',
    GET_POSTS_SUCCESS: 'GET_POSTS_SUCCESS',
    GET_POSTS_FAIL: 'GET_POSTS_FAIL',
    UPDATE_POST_REQUEST: 'UPDATE_POST_REQUEST',
    UPDATE_POST_SUCCESS: 'UPDATE_POST_SUCCESS',
    UPDATE_POST_FAIL: 'UPDATE_POST_FAIL',
    GET_POST_REQUEST: 'GET_POST_REQUEST',
    GET_POST_SUCCESS: 'GET_POST_SUCCESS',
    GET_POST_FAIL: 'GET_POST_FAIL',
    DELETE_POST_REQUEST: 'DELETE_POST_REQUEST',
    DELETE_POST_SUCCESS: 'DELETE_POST_SUCCESS',
    DELETE_POST_FAIL: 'DELETE_POST_FAIL',
}


export const createPost = ({content, auth, postId}) => async (dispatch) => {
    try {
        dispatch({type: GLOBALTYPES.ALERT_REQUEST, payload: {loading: true}});
        const response = await postDataAPI(`posts/${postId}`, toFormData.serialize(content), auth.token);

        if (response.status === 200) {
            dispatch({
                type: POST_TYPES.CREATE_POST_SUCCESS,
                payload: {...response.data, content: content.content}
            })
        } else {
            dispatch({
                type: POST_TYPES.CREATE_POST_SUCCESS,
                payload: {...response?.data?.newPost}
            })
        }
        dispatch({type: GLOBALTYPES.ALERT_SUCCESS, payload: {loading: false}});

        const msg = {
            id: response.data.newPost.id,
            text: 'added a new post.',
            recipients: response.data.newPost.user.followers,
            url: `/post/${response.data.newPost.id}`,
        }
        dispatch(createNotify({msg, auth}))
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT_FAIL,
            payload: {error: err.response?.data?.msg}
        })
    }
}

export const getPosts = (limit, token) => async (dispatch) => {
    try {
        dispatch({type: POST_TYPES.LOADING_POST_REQUEST, payload: false})

        const {data} = await getDataAPI('posts', null, token)

        dispatch({
            type: POST_TYPES.GET_POSTS_SUCCESS,
            payload: {...data}
        })

        dispatch({type: POST_TYPES.LOADING_POST_SUCCESS, payload: false})
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT_FAIL,
            payload: {error: err?.response?.data?.msg}
        })
    }
}

export const updatePost = ({content, status, auth}) => async (dispatch) => {
    try {
        dispatch({type: GLOBALTYPES.ALERT_REQUEST, payload: {loading: true}})

        let payload;

        const responseImage = await putDataAPI(`post/${status.id}`, toFormData.serialize(content), auth.token)
        if (responseImage.status === 200) {
            payload = {
                ...responseImage.data
            }
        }

        if (payload) {
            dispatch({
                type: POST_TYPES.UPDATE_POST_SUCCESS,
                payload
            })
        }
        dispatch({type: GLOBALTYPES.ALERT_SUCCESS, payload: {loading: false}})
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT_FAIL,
            payload: {error: err.response?.data?.msg}
        })
    }
}

export const likePost = ({post, auth, socket}) => async (dispatch) => {
    const newPost = {...post, likes: [post.likes, auth.user]}
    dispatch({type: POST_TYPES.UPDATE_POST_REQUEST, payload: newPost})
    try {
        await postDataAPI(`post/${post.id}/like`, null, auth.token)

        const msg = {
            id: auth.user.id,
            text: 'like your post.',
            recipients: [post.user.id],
            url: `/post/${post.id}`,
            content: post.content,
            image: post.images[0].url
        }

        dispatch(createNotify({msg, auth, socket}))

    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT_FAIL,
            payload: {error: err?.response?.data.msg}
        })
    }
}

export const unLikePost = ({post, auth, socket}) => async (dispatch) => {
    const newPost = {...post,}
    dispatch({type: POST_TYPES.UPDATE_POST_REQUEST, payload: newPost})


    try {
        await deleteDataAPI(`post/${post.id}/unlike`, null, auth.token)

        const msg = {
            id: auth.user.id,
            text: 'like your post.',
            recipients: [post.user.id],
            url: `/post/${post.id}`,
        }
        dispatch(removeNotify({msg, auth, socket}))

    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT_FAIL,
            payload: {error: err?.response?.data.msg}
        })
    }
}

export const getPost = ({detailPost, id, auth}) => async (dispatch) => {
    if (detailPost.every(post => post.id !== id)) {
        try {
            const res = await getDataAPI(`post/${id}`, auth.token)
            dispatch({type: POST_TYPES.GET_POST_SUCCESS, payload: res.data.post})
        } catch (err) {
            dispatch({
                type: GLOBALTYPES.ALERT_FAIL,
                payload: {error: err.response.data.msg}
            })
        }
    }
}

export const deletePost = ({post, auth, socket}) => async (dispatch) => {
    dispatch({type: POST_TYPES.DELETE_POST_REQUEST, payload: post})

    try {
        const res = await deleteDataAPI(`post/${post.id}`, auth.token)

        const msg = {
            id: post.id,
            text: 'added a new post.',
            recipients: res.data.newPost.user.followers,
            url: `/post/${post.id}`,
        }
        dispatch(removeNotify({msg, auth, socket}))

    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT_FAIL,
            payload: {error: err?.response?.data.msg}
        })
    }
}


