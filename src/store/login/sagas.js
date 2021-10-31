import { call, put, takeLatest } from 'redux-saga/effects';
import { postDataAPI } from '../../utils/Api';
import {
    loginUsersFailure,
    loginUserRequest,
    loginUsersSuccess,
    registerUserRequest,
    registerUsersSuccess, registerUsersFailure
} from "./action";


function* loginUser({ payload }) {
    try {
        const res = yield call(() => postDataAPI('login', payload));
        if (res.status === 200){
            localStorage.setItem('access_token', res.data.access_token);
            yield put(loginUsersSuccess(res.data));
        }
    } catch (err) {
        yield put(loginUsersFailure(err));
    }
}

function* registerUser({ payload }) {
    try {
        const res = yield call(() => postDataAPI('register', payload));
        if (res.status === 200){
            localStorage.setItem('access_token', res.data.access_token);
            yield put(registerUsersSuccess(res.data));
        }
    } catch (err) {
        yield put(registerUsersFailure(err));
    }
}


export default function* watcher() {
    yield takeLatest(loginUserRequest, loginUser);
    yield takeLatest(registerUserRequest, registerUser);
}
