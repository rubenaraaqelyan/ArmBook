import { GLOBALTYPES } from '../actions/globalTypes';
import { getDataAPI } from '../../utils/Api';

export const DISCOVER_TYPES = {
    LOADING_REQUEST: 'LOADING_REQUEST',
    LOADING_SUCCESS: 'LOADING_SUCCESS',
    LOADING_FAIL: 'LOADING_FAIL',
    GET_POSTS_REQUEST: 'GET_POSTS_REQUEST',
    GET_POSTS_SUCCESS: 'GET_POSTS_SUCCESS',
    GET_POSTS_FAIL: 'GET_POSTS_FAIL',
    UPDATE_POST_REQUEST: 'UPDATE_POST_REQUEST',
    UPDATE_POST_SUCCESS: 'UPDATE_POST_SUCCESS',
    UPDATE_POST_FAIL: 'UPDATE_POST_FAIL',
}

export const getDiscoverPosts = (token) => async (dispatch) => {
    try {
        dispatch({type: DISCOVER_TYPES.LOADING_REQUEST, payload: true})

        const res = await getDataAPI(`post_discover`, token)
        dispatch({type: DISCOVER_TYPES.GET_POSTS_SUCCESS, payload: res.data})

        dispatch({type: DISCOVER_TYPES.LOADING_SUCCESS, payload: false})

    } catch (err) {
        dispatch({type: GLOBALTYPES.ALERT_FAIL, payload: {error: err?.response?.data.msg}})
    }
}
