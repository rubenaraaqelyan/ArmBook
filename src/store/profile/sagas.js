import { takeLatest, call, put } from 'redux-saga/effects';
import {
    PROFILE_TYPES
} from './action';
import { deleteDataAPI, getDataAPI } from '../../utils/Api';

export default function* watcher() {
    yield takeLatest(PROFILE_TYPES.GET_USER_REQUEST, getProfile);
    yield takeLatest(PROFILE_TYPES.FOLLOW_REQUEST, getFollow);
    yield takeLatest(PROFILE_TYPES.UNFOLLOW_REQUEST, deleteFollow);
}



function* getProfile() {
    try {

        const { data } = yield call(getDataAPI);

        yield put({
            type: PROFILE_TYPES.GET_USER_SUCCESS,
            payload: data,
        });

    } catch (err) {
        yield put({
            type: PROFILE_TYPES.GET_USER_FAIL,
            message: err.message,
        })
    }
}

function* getFollow() {
    try {

        const { data } = yield call(getDataAPI);

        yield put({
            type: PROFILE_TYPES.FOLLOW_SUCCESS,
            payload: data,
        });

    } catch (err) {
        yield put({
            type: PROFILE_TYPES.FOLLOW_FAIL,
            message: err.message,
        })
    }
}

function* deleteFollow(id) {
    try {
        const { data } = yield call(deleteDataAPI, id);

        yield put({
            type: PROFILE_TYPES.UNFOLLOW_SUCCESS,
            payload: data,
        });

    } catch (err) {
        yield put({
            type: PROFILE_TYPES.UNFOLLOW_FAIL,
            message: err.message,
        })
    }
}









