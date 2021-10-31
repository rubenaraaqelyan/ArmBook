import { GLOBALTYPES } from '../actions/globalTypes';
import { getDataAPI } from '../../utils/Api';
import { SetSended_ActionCreator } from './reducer'

export const SUGGES_TYPES = {
    LOADING_REQUEST: 'LOADING_REQUEST',
    LOADING_SUCCESS: 'LOADING_SUCCESS',
    LOADING_FAIL: 'LOADING_FAIL',
    GET_USERS_REQUEST: 'GET_USERS_REQUEST',
    GET_USERS_SUCCESS: 'GET_USERS_SUCCESS',
    GET_USERS_FAIL: 'GET_USERS_FAIL',
    GET_FRIENDS_REQUEST: 'GET_FRIENDS_REQUEST',
    GET_FRIENDS_SUCCESS: 'GET_FRIENDS_SUCCESS',
    GET_FRIENDS_FAIL: 'GET_FRIENDS_FAIL',
    REMOVE_USER_REQUEST: "REMOVE_USER_REQUEST",
    REMOVE_USER_SUCCESS: "REMOVE_USER_SUCCESS",
    REMOVE_USER_FAIL: "REMOVE_USER_FAIL"
}

export const getSendedFollowings = () => async (dispatch) => {
    try {
        const response =  await getDataAPI('userData/get_sended_friends')
        if (response.status === 200) {
            dispatch(SetSended_ActionCreator(response.data.result));
        }

    } catch (err) {
        dispatch({type: GLOBALTYPES.ALERT_FAIL, payload: {error: err?.response?.data.msg}})
    }
}

export const getSuggestions = () => async (dispatch) => {
    try {
        dispatch({ type: SUGGES_TYPES.LOADING_REQUEST, payload: true })

        const res = await getDataAPI('/suggestionsUser')
        dispatch({ type: SUGGES_TYPES.GET_USERS_SUCCESS, payload: res.data.result })

        dispatch({ type: SUGGES_TYPES.LOADING_SUCCESS, payload: false })

    } catch (err) {
        dispatch({type: GLOBALTYPES.ALERT_FAIL, payload: {err}})
    }
}
