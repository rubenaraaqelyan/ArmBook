import { takeLatest, call, put } from 'redux-saga/effects';
import {
    NOTIFY_TYPES
} from './action';
import {deleteDataAPI, getDataAPI, postDataAPI, putDataAPI} from '../../utils/Api';

export default function* watcher() {
    yield takeLatest(NOTIFY_TYPES.CREATE_NOTIFY_REQUEST, createNotify);
    yield takeLatest(NOTIFY_TYPES.GET_NOTIFIES_REQUEST, getNotify);
    yield takeLatest(NOTIFY_TYPES.REMOVE_NOTIFY_REQUEST, deleteNotify);
    yield takeLatest(NOTIFY_TYPES.DELETE_ALL_NOTIFIES_REQUEST, deleteAllNotify);
    yield takeLatest(NOTIFY_TYPES.UPDATE_NOTIFY_REQUEST, updateNotify);
}



function* createNotify() {
    try {
        const { data } = yield call(postDataAPI);

        yield put({
            type: NOTIFY_TYPES.CREATE_NOTIFY_SUCCESS,
            payload: data,
        });

    } catch (err) {
        yield put({
            type: NOTIFY_TYPES.CREATE_NOTIFY_FAIL,
            message: err.message,
        })
    }
}


function* getNotify() {
    try {

        const { data } = yield call(getDataAPI);

        yield put({
            type: NOTIFY_TYPES.GET_NOTIFIES_SUCCESS,
            payload: data,
        });

    } catch (err) {
        yield put({
            type: NOTIFY_TYPES.GET_NOTIFIES_FAIL,
            message: err.message,
        })
    }
}

function* deleteNotify(id) {
    try {
        const { data } = yield call(deleteDataAPI, id);

        yield put({
            type: NOTIFY_TYPES.REMOVE_NOTIFY_SUCCESS,
            payload: data,
        });

    } catch (err) {
        yield put({
            type: NOTIFY_TYPES.REMOVE_NOTIFY_FAIL,
            message: err.message,
        })
    }
}

function* deleteAllNotify(id) {
    try {
        const { data } = yield call(deleteDataAPI, id);

        yield put({
            type: NOTIFY_TYPES.DELETE_ALL_NOTIFIES_SUCCESS,
            payload: data,
        });

    } catch (err) {
        yield put({
            type: NOTIFY_TYPES.DELETE_ALL_NOTIFIES_FAIL,
            message: err.message,
        })
    }
}

function* updateNotify(action) {
    try {
        const { data } = yield call(putDataAPI);

        yield put({
            type: NOTIFY_TYPES.UPDATE_NOTIFY_SUCCESS,
            payload: data,
        });

    } catch (err) {
        yield put({
            type: NOTIFY_TYPES.UPDATE_NOTIFY_FAIL,
            message: err.message,
        })
    }
}







