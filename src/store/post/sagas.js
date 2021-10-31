import { takeLatest, call, put } from 'redux-saga/effects';
import {
    POST_TYPES
} from './action';
import { deleteDataAPI, postDataAPI, putDataAPI } from '../../utils/Api';
import toFormData from "object-to-formdata";

export default function* watcher() {
    yield takeLatest(POST_TYPES.CREATE_POST_REQUEST, createPosts);
    yield takeLatest(POST_TYPES.DELETE_POST_REQUEST, deletePosts);
    yield takeLatest(POST_TYPES.UPDATE_POST_REQUEST, updatePosts);
}



function* createPosts() {
    try {
        const { data } = yield call(postDataAPI);

        yield put({
            type: POST_TYPES.CREATE_POST_SUCCESS,
            payload: data,
        });

    } catch (err) {
        yield put({
            type: POST_TYPES.CREATE_POST_FAIL,
            message: err.message,
        })
    }
}


function* deletePosts(id) {
    try {
        const { data } = yield call(deleteDataAPI, id);

        yield put({
            type: POST_TYPES.DELETE_POST_SUCCESS,
            payload: data,
        });

    } catch (err) {
        yield put({
            type: POST_TYPES.DELETE_POST_FAIL,
            message: err.message,
        })
    }
}


function* updatePosts({content, status}) {
    try {
        const { data } = yield call(putDataAPI(`post/${status.id}`, toFormData.serialize(content)));

        yield put({
            type: POST_TYPES.UPDATE_POST_SUCCESS,
            payload: data,
        });

    } catch (err) {
        yield put({
            type: POST_TYPES.UPDATE_POST_FAIL,
            message: err.message,
        })
    }
}







