import { GLOBALTYPES } from '../actions/globalTypes';
import { postDataAPI, deleteDataAPI, getDataAPI, patchDataAPI } from '../../utils/Api';

export const NOTIFY_TYPES = {
    GET_NOTIFIES_REQUEST: 'GET_NOTIFIES_REQUEST',
    GET_NOTIFIES_SUCCESS: 'GET_NOTIFIES_SUCCESS',
    GET_NOTIFIES_FAIL: 'GET_NOTIFIES_FAIL',
    CREATE_NOTIFY_REQUEST: 'CREATE_NOTIFY_REQUEST',
    CREATE_NOTIFY_SUCCESS: 'CREATE_NOTIFY_SUCCESS',
    CREATE_NOTIFY_FAIL: 'CREATE_NOTIFY_FAIL',
    REMOVE_NOTIFY_REQUEST: 'REMOVE_NOTIFY_REQUEST',
    REMOVE_NOTIFY_SUCCESS: 'REMOVE_NOTIFY_SUCCESS',
    REMOVE_NOTIFY_FAIL: 'REMOVE_NOTIFY_FAIL',
    UPDATE_NOTIFY_REQUEST: 'UPDATE_NOTIFY_REQUEST',
    UPDATE_NOTIFY_SUCCESS: 'UPDATE_NOTIFY_SUCCESS',
    UPDATE_NOTIFY_FAIL: 'UPDATE_NOTIFY_FAIL',
    UPDATE_SOUND_REQUEST: 'UPDATE_SOUND_REQUEST',
    UPDATE_SOUND_SUCCESS: 'UPDATE_SOUND_SUCCESS',
    UPDATE_SOUND_FAIL: 'UPDATE_SOUND_FAIL',
    DELETE_ALL_NOTIFIES_REQUEST: 'DELETE_ALL_NOTIFIES_REQUEST',
    DELETE_ALL_NOTIFIES_SUCCESS: 'DELETE_ALL_NOTIFIES_SUCCESS',
    DELETE_ALL_NOTIFIES_FAIL: 'DELETE_ALL_NOTIFIES_FAIL',
}

export const createNotify = ({msg, auth, socket}) => async (dispatch) => {
    try {
        const res = await postDataAPI('notify', msg, auth.token)

        socket.emit('createNotify', {
            ...res.data.notify,
            user: {
                firstName: auth.user.firstName,
                avatar: auth.user.avatar
            }
        })
    } catch (err) {
        dispatch({type: GLOBALTYPES.ALERT_FAIL, payload: {error: err.response.data.msg}})
    }
}

export const removeNotify = () => async () => {
    try {

    } catch (err) {

    }
}

export const getNotifies = (token) => async (dispatch) => {
    try {
        const res = await getDataAPI('notifies', token)

        dispatch({ type: NOTIFY_TYPES.GET_NOTIFIES_SUCCESS, payload: res.data.notifies })
    } catch (err) {
        dispatch({type: GLOBALTYPES.ALERT_FAIL, payload: {error: err.response.data.msg}})
    }
}

export const isReadNotify = () => async (dispatch) => {

    try {

    } catch (err) {

    }
}

export const getOwnFollowingRequests = () => async (dispatch) => {
    try {
        const response =  await getDataAPI('/userData/follow_requests',)

        if (response.status === 200) {
            dispatch({type: GLOBALTYPES.GET_USERS, payload: response.data.followers})
            debugger
            console.log(response.data.followers, 'followers')
        }
    } catch (err) {
        dispatch({type: GLOBALTYPES.ALERT_FAIL, payload: {error: err?.response?.data.msg}})
    }
}

export const acceptFollowingRequest = (followerId) => async (dispatch) => {
    try {
        const response =  await patchDataAPI('userData/accept_follow', {followerId} )

        if (response.status === 200) {
            dispatch({type: GLOBALTYPES.REMOVE_USER, payload: {followerId }})
        }

    } catch (err) {
        dispatch({type: GLOBALTYPES.ALERT_FAIL, payload: {error: err?.response?.data.msg}})
    }
}

export const getFriends = () => async (dispatch) => {
    try {
        const response =  await getDataAPI('userData/friends')

        if (response.status === 200) {
            dispatch({type: GLOBALTYPES.GET_FRIENDS_SUCCESS, payload: response.data.result })
        }

    } catch (err) {
        dispatch({type: GLOBALTYPES.ALERT_FAIL, payload: {error: err?.response?.data.msg}})
    }
}

export const denyRequest = (id) => async (dispatch) => {
    try {
        const response =  await deleteDataAPI(`userData/deny/${id}`)

        if (response.status === 200) {
            dispatch({type: GLOBALTYPES.GET_FRIENDS_SUCCESS, payload: response.data.result })
        }

    } catch (err) {
        dispatch({type: GLOBALTYPES.ALERT_FAIL, payload: {error: err?.response?.data.msg}})
    }
}

