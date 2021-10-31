import { takeLatest, call, put } from 'redux-saga/effects';
import {
    DISCOVER_TYPES
} from './action';
import { getDataAPI} from '../../utils/Api';

export default function* watcher() {
    // yield takeLatest(DISCOVER_TYPES.GET_POSTS_REQUEST, getPosts);
}


function* getPosts() {
    try {

        const { data } = yield call(getDataAPI)

        yield put({
            type: DISCOVER_TYPES.GET_POSTS_SUCCESS,
            payload: data,
        });

    } catch (err) {
        yield put({
            type: DISCOVER_TYPES.GET_POSTS_FAIL,
            message: err.message,
        })
    }
}




