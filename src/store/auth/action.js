import { GLOBALTYPES } from '../actions/globalTypes';
import { getDataAPI, postDataAPI, putDataAPI } from '../../utils/Api';
import { AuthErrorMsg_ActionCreator, SetLoginBtn_ActionCreator } from './reducer.js'
import valid from '../../utils/Validation';
import axios from 'axios';


const AuthActionCreator = (payload) => {
    return {
        type: GLOBALTYPES.AUTH_REQUEST,
        payload
    }
}

const SetAuthReadyActionCreator = (status) => {
    return {
        type: GLOBALTYPES.AUTHREADY_REQUEST,
        payload: {
            authReady: status
        }
    }
}

export const login = (data) => async (dispatch) => {
    try {
        dispatch(AuthErrorMsg_ActionCreator(null));
        dispatch(SetLoginBtn_ActionCreator(true));
        dispatch({type: GLOBALTYPES.ALERT_REQUEST, payload: {loading: true}});
        const response = await postDataAPI('login', data);
        localStorage.setItem('access_token', response.data.access_token);
        dispatch(getUserData(true));
        dispatch(SetAuthReadyActionCreator(true));
        dispatch({type: GLOBALTYPES.ALERT_SUCCESS, payload: {loading: false}});
    } catch (err) {
        dispatch(AuthErrorMsg_ActionCreator(err.response.data.msg));
        dispatch(SetLoginBtn_ActionCreator(false));
    }
}

export const getUserData = (auth) => async (dispatch) => {
    try {
        if (auth) {
            const {data: {user}} = await getDataAPI('user_data');

            if (user) {
                dispatch(AuthActionCreator({
                    user,
                    auth: true,
                    authReady: true
                }));
            }
        } else {
            dispatch(AuthActionCreator({
                authReady: true
            }));
        }
        dispatch(SetAuthReadyActionCreator(true))
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT_FAIL,
            payload: {
                error: err.response
            }
        })
    }
}

export const refreshToken = () => async (dispatch) => {
    const firstLogin = localStorage.getItem("access_token")
    if (firstLogin) {
        dispatch({type: GLOBALTYPES.ALERT_REQUEST, payload: {loading: true}})

        try {
            const res = await postDataAPI('refresh_token')
            dispatch({
                type: GLOBALTYPES.AUTH_SUCCESS,
                payload: {
                    token: res.data.access_token,
                    user: res.data.user
                }
            })

            dispatch({type: GLOBALTYPES.ALERT_SUCCESS, payload: {}})

        } catch (err) {
            dispatch({
                type: GLOBALTYPES.ALERT_FAIL,
                payload: {
                    error: err.response.data.msg
                }
            })
        }
    }
}

export const register = (data, touched) => async (dispatch) => {
    const check = valid(data, touched)
    if (check.length > 0)
        return dispatch({type: GLOBALTYPES.ALERT_FAIL, payload: check.errMsg})

    try {
        dispatch({type: GLOBALTYPES.ALERT_REQUEST, payload: {loading: true}})

        const res = await postDataAPI('register', data)
        localStorage.setItem('access_token', res.data.access_token)
        axios.interceptors.request.use((config) => {
            config.headers.Authorization = `Bearer ${res.data.access_token}`
            return config
        }, (error) => Promise.reject(error))

        dispatch({
            type: GLOBALTYPES.AUTH_SUCCESS,
            payload: {
                user: res.data.user
            }
        })
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT_FAIL,
            payload: {
                error: err.response.data.msg
            }
        })
    }
}

export const logout = () => async (dispatch) => {
    try {
        localStorage.removeItem("access_token")
        const res = await postDataAPI('logout')
        if (res.status === 200) {
            dispatch(AuthActionCreator({
                user: null,
                token: null,
                auth: false,
                authReady: true
            }));
        }
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT_FAIL,
            payload: {
                error: err.response.data.msg
            }
        })
    }
}

export const resetPassword = (email) => async (dispatch) => {
    try {
        const response = await postDataAPI('/reset_password', {email})
        if (response.status === 200) {
            dispatch({type: GLOBALTYPES.VERIFY_DATA_SUCCESS, payload: response.data})
        }

    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT_FAIL,
            payload: {
                error: err.response.data.msg
            }
        })
    }
}

export const changePassword = (activationCode, password) => async (dispatch) => {
    try {
        const response = await putDataAPI('/confirm_email', {activationCode, password})
        if (response.status === 200) {
            dispatch({type: GLOBALTYPES.CHANGE_PASSWORD_SUCCESS, payload: response.data})
        }

    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT_FAIL,
            payload: {
                error: err.response.data.msg
            }
        })
    }
}

