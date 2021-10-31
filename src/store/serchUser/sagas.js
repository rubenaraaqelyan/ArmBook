import { call, put, takeLatest } from 'redux-saga/effects';
import { getDataAPI } from '../../utils/Api';
import { searchUsersFailure, searchUsersRequest, searchUsersSuccess } from './action';


function* searchUsers({payload} ) {
    try {
        const res = yield call(() => getDataAPI(`search?firstName=${payload}`));
        yield put(searchUsersSuccess(res.data));
    } catch (err) {
        yield put(searchUsersFailure(err));
    }
}



export default function* watcher() {
    yield takeLatest(searchUsersRequest, searchUsers);
}
