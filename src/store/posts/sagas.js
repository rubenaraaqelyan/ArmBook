import { call, put, takeLatest } from 'redux-saga/effects';
import { deleteDataAPI, getDataAPI, postDataAPI, putDataAPI } from '../../utils/Api';
import {
    getPostsRequest,
    getPostsSuccess,
    getPostsFailure,
    createPostsRequest,
    addPost_ActionCreatorSuccess,
    addPost_ActionCreatorFailure,
    createPostsSuccess,
    updatePostsRequest,
    updatePostsSuccess,
    updatePostsFailure,
    likePostsRequest,
    unlikePostsRequest,
    deletePostsRequest,
    addPost_ActionCreatorRequest,
    createCommentFailure, createCommentRequest,
    createCommentSuccess,
    deleteCommentFailure, deleteCommentRequest,
    deleteCommentSuccess, addCommentRequest, addCommentSuccess, addCommentFailure
} from "./action";
import toFormData from 'object-to-formdata';


function* createPosts({ content, postId }){
    try {
        const res = yield call(() => postDataAPI(`posts/${postId}`, toFormData.serialize(content)))
        yield put(createPostsSuccess(res.data));
    }catch (err){
        yield put(createPostsSuccess(err));
    }
}

function* getPosts() {
    try {
        const res = yield call(() => getDataAPI(`posts`))
        yield put(getPostsSuccess(res.data));
    } catch (err) {
        yield put(getPostsFailure(err));
    }
}

function* addPosts({payload}){
    try {
        const res = yield call(() => getDataAPI(`posts?page=${payload.page}`));
        yield put(addPost_ActionCreatorSuccess(res.data));
    }catch (err){
        yield put(addPost_ActionCreatorFailure(err));
    }
}

function* updatePosts({ content, status }){
    try {
        const res = yield call(() => putDataAPI(`post/${status.id}`, toFormData.serialize(content)))
        yield put(updatePostsSuccess(res.data));
    }catch (err){
        yield put(updatePostsFailure(err));
    }
}

function* likePosts({ post }){
    try {
        const res = yield call(() => postDataAPI(`post/${post.id}/like`))
        yield put(updatePostsSuccess(res.data));
    }catch (err){
        yield put(updatePostsFailure(err));
    }
}

function* unlikePosts({ post }){
    try {
        const res = yield call(() => deleteDataAPI(`post/${post.id}/unlike`));
        yield put(updatePostsSuccess(res.data));
    }catch (err){
        yield put(updatePostsFailure(err));
    }
}

function* deletePosts({ post }){
    try {
        const res = yield call(() => deleteDataAPI(`post/${post.id}`));
        yield put(updatePostsSuccess(res.data));
    }catch (err){
        yield put(updatePostsFailure(err));
    }
}

function* createComment({ payload }) {
    try {
        const res = yield call(() => postDataAPI('comment', payload));
        if (res.status === 200){
            yield put(createCommentSuccess(res.data));
        }
    } catch (err) {
        yield put(createCommentFailure(err));
    }
}

function* deleteComment({ payload }) {
    try {
        const res = yield call(() => deleteDataAPI(`comment/${payload.id}`));
        if (res.status === 200){
            yield put(deleteCommentSuccess(res.data.comment));
        }
    } catch (err) {
        yield put(deleteCommentFailure(err));
    }
}

function* addComment({ payload }) {
    try {
        debugger
        const res = yield call(() => postDataAPI('comment', payload));
        debugger
        if (res.status === 200){
            yield put(addCommentSuccess(res.data));
        }
    } catch (err) {
        yield put(addCommentFailure(err));
    }
}



export default function* watcher() {
    yield takeLatest(createPostsRequest, createPosts);
    yield takeLatest(getPostsRequest, getPosts);
    yield takeLatest(updatePostsRequest, updatePosts);
    yield takeLatest(likePostsRequest, likePosts);
    yield takeLatest(unlikePostsRequest, unlikePosts);
    yield takeLatest(deletePostsRequest, deletePosts);
    yield takeLatest(addPost_ActionCreatorRequest, addPosts);
    yield takeLatest(createCommentRequest, createComment);
    yield takeLatest(deleteCommentRequest, deleteComment);
    yield takeLatest(addCommentRequest, addComment);
}
