import { GLOBALTYPES } from '../actions/globalTypes';
import { getDataAPI, postDataAPI, putDataAPI } from '../../utils/Api';
import { UpdateUserData_ActionCreator } from '../auth/reducer';
import {AddComment_ActionCreator} from "./reducer";
import { RemoveSendedRequest_ActionCreator, AddSendedRequest_ActionCreator } from '../suggestion/reducer'
import toFormData from 'object-to-formdata';

export const PROFILE_TYPES = {
    LOADING_REQUEST: 'LOADING_REQUEST',
    LOADING_SUCCESS: 'LOADING_SUCCESS',
    LOADING_FAIL: 'LOADING_FAIL',
    GET_USER_REQUEST: 'GET_USER_REQUEST',
    GET_USER_SUCCESS: 'GET_USER_SUCCESS',
    GET_USER_FAIL: 'GET_USER_FAIL',
    FOLLOW_REQUEST: 'FOLLOW_REQUEST',
    FOLLOW_SUCCESS: 'FOLLOW_SUCCESS',
    FOLLOW_FAIL: 'FOLLOW_FAIL',
    UNFOLLOW_REQUEST: 'UNFOLLOW_REQUEST',
    UNFOLLOW_SUCCESS: 'UNFOLLOW_SUCCESS',
    UNFOLLOW_FAIL: 'UNFOLLOW_FAIL',
    GET_ID: 'GET_PROFILE_ID',
    GET_POSTS_REQUEST: 'GET_POSTS_REQUEST',
    GET_POSTS_SUCCESS: 'GET_POSTS_SUCCESS',
    GET_POSTS_FAIL: 'GET_POSTS_FAIL',
    UPDATE_POST_REQUEST: 'UPDATE_POST_REQUEST',
    UPDATE_POST_SUCCESS: 'UPDATE_POST_SUCCESS',
    UPDATE_POST_FAIL: 'UPDATE_POST_FAIL',
    ADD_COMMENT_REQUEST: 'ADD_POST_REQUEST',
    ADD_COMMENT_SUCCESS: 'ADD_COMMENT_SUCCESS',
    REMOVE_COMMENT_REQUEST: 'REMOVE_COMMENT_REQUEST',
    REMOVE_COMMENT_SUCCESS: 'REMOVE_COMMENT_SUCCESS'
}



export const getProfileUsers = ({id, auth}) => async (dispatch) => {
    dispatch({type: PROFILE_TYPES.GET_ID, payload: id})

    try {
        dispatch({type: PROFILE_TYPES.LOADING_REQUEST, payload: true})
        const res = getDataAPI(`user/${id}`, auth.token)
        const res1 = getDataAPI(`user_posts/${id}`, auth.token)

        const users = await res;
        const posts = await res1;

        dispatch({
            type: PROFILE_TYPES.GET_USER_SUCCESS,
            payload: users.data
        })

        dispatch({
            type: PROFILE_TYPES.GET_POSTS_SUCCESS,
            payload: {...posts.data, id: id, page: 2}
        })

        dispatch({type: PROFILE_TYPES.LOADING_SUCCESS, payload: false})
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT_FAIL,
            payload: {error: err.response?.data?.msg}
        })
    }

}

export const updateProfileUser = ({userData, auth}) => async (dispatch) => {
    if (!userData.firstName)
        return dispatch({type: GLOBALTYPES.ALERT_FAIL, payload: {error: "Please add your first name."}})

    if (userData.firstName?.length > 25)
        return dispatch({type: GLOBALTYPES.ALERT_FAIL, payload: {error: "Your first name is too long."}})

    if (userData.story?.length > 200)
        return dispatch({type: GLOBALTYPES.ALERT_FAIL, payload: {error: "Your story too long."}})

    try {
        dispatch({type: GLOBALTYPES.ALERT_REQUEST, payload: {loading: true}})

        const response = await putDataAPI(`user`, toFormData.serialize(userData), toFormData.serialize(auth))


        if (response.status === 200) {
            dispatch(UpdateUserData_ActionCreator(response.data.user))
        }

        dispatch({type: GLOBALTYPES.ALERT_SUCCESS, payload: {loading: false}})
        dispatch({type: GLOBALTYPES.ALERT_SUCCESS, payload: {success: response.data.msg}})
    } catch (err) {

        dispatch({
            type: GLOBALTYPES.ALERT_FAIL,
            payload: {error: err?.response?.data.msg}
        })
    }
}

export const addFriend = ({user, auth}) => async (dispatch) => {
    try {
        const res = await postDataAPI(`user/${user.id}/addFriend`, null, auth.token)
        if (res.status === 200) {
            dispatch(AddSendedRequest_ActionCreator({ userId: user.id }))
        }
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT_FAIL,
            payload: {error: err?.response?.data.msg}
        })
    }
}

export const cancelFriend = (id) => async (dispatch) => {
    try {
        const res = await postDataAPI(`user/${id}/cancelFriend`)

        if (res.status === 200) {
              dispatch(RemoveSendedRequest_ActionCreator(id))
        }
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT_FAIL,
            payload: {error: err.response.data.msg}
        })
    }
}
