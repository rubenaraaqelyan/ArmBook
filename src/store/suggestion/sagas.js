import { takeLatest, call, put } from 'redux-saga/effects';
import {
    SUGGES_TYPES
} from './action';
import {getDataAPI } from '../../utils/Api';

export default function* watcher() {
    yield takeLatest(SUGGES_TYPES.GET_FRIENDS_REQUEST, getFriends);
}


function* getFriends() {
    try {

        const { data } = yield call(getDataAPI);

        yield put({
            type: SUGGES_TYPES.GET_FRIENDS_SUCCESS,
            payload: data,
        });

    } catch (err) {
        yield put({
            type: SUGGES_TYPES.GET_FRIENDS_FAIL,
            message: err.message,
        })
    }
}











