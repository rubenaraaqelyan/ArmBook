import { takeLatest, call, put } from 'redux-saga/effects';
import {
    GLOBALTYPES
} from '../actions/globalTypes';
import { deleteDataAPI, getDataAPI, postDataAPI, putDataAPI } from '../../utils/Api';

export default function* watcher() {
    yield takeLatest(GLOBALTYPES.AUTH_REQUEST, createAuth);
    yield takeLatest(GLOBALTYPES.AUTHREADY_REQUEST, getAuth);
    yield takeLatest(GLOBALTYPES.GET_FRIENDS_REQUEST, getFriends);
    yield takeLatest(GLOBALTYPES.REMOVE_USER_REQUEST, deleteUser);
    yield takeLatest(GLOBALTYPES.DELETE_FRIENDS_REQUEST, deleteFriends);
    yield takeLatest(GLOBALTYPES.VERIFY_DATA_REQUEST, createPass);
    yield takeLatest(GLOBALTYPES.CHANGE_PASSWORD_REQUEST, updatePass);
}

function* createAuth() {
    try {
        const { data } = yield call(postDataAPI('register', data))

        yield put({
            type: GLOBALTYPES.AUTH_SUCCESS,
            payload: data,
        });

    } catch (err) {
        yield put({
            type: GLOBALTYPES.AUTH_FAIL,
            message: err.message,
        })
    }
}

function* getAuth() {
    try {

        const { data } = yield call(getDataAPI('user_data',data))

        yield put({
            type: GLOBALTYPES.AUTHREADY_SUCCESS,
            payload: data,
        });

    } catch (err) {
        yield put({
            type: GLOBALTYPES.AUTHREADY_FAIL,
            message: err.message,
        })
    }
}

function* deleteUser(id) {
    try {
        const { data } = yield call(deleteDataAPI, id)

        yield put({
            type: GLOBALTYPES.REMOVE_USER_SUCCESS,
            payload: data,
        });

    } catch (err) {
        yield put({
            type: GLOBALTYPES.REMOVE_USER_FAIL,
            message: err.message,
        })
    }
}

function* createPass(email) {
    try {
        const { data } = yield call(postDataAPI('/reset_password', {email}))

        yield put({
            type: GLOBALTYPES.VERIFY_DATA_SUCCESS,
            payload: data,
        });

    } catch (err) {
        yield put({
            type: GLOBALTYPES.VERIFY_DATA_FAIL,
            message: err.message,
        })
    }
}

function* updatePass(activationCode, password) {
    try {
        const { data } = yield call(putDataAPI('/confirm_email', {activationCode, password}))

        yield put({
            type: GLOBALTYPES.CHANGE_PASSWORD_SUCCESS,
            payload: data,
        });

    } catch (err) {
        yield put({
            type: GLOBALTYPES.CHANGE_PASSWORD_FAIL,
            message: err.message,
        })
    }
}


function* getFriends() {
    try {

        const { data } = yield call(getDataAPI)

        yield put({
            type: GLOBALTYPES.GET_FRIENDS_SUCCESS,
            payload: data,
        });

    } catch (err) {
        yield put({
            type: GLOBALTYPES.GET_FRIENDS_FAIL,
            message: err.message,
        })
    }
}


function* deleteFriends(id) {
    try {
        const { data } = yield call(deleteDataAPI, id)

        yield put({
            type: GLOBALTYPES.DELETE_FRIENDS_SUCCESS,
            payload: data,
        });

    } catch (err) {
        yield put({
            type: GLOBALTYPES.DELETE_FRIENDS_FAIL,
            message: err.message,
        })
    }
}



