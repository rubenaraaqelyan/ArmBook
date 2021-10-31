import { createAction } from 'redux-actions';

export const SET_REFRESH = createAction('SET_REFRESH')
export const createPostsRequest = createAction('CREATE_POSTS_REQUEST');
export const createPostsSuccess = createAction('CREATE__POSTS_SUCCESS');
export const createPostsFailure = createAction('CREATE__POSTS_FAILURE');
export const getPostsRequest = createAction('GET_POSTS_REQUEST');
export const getPostsSuccess = createAction('GET_POSTS_SUCCESS');
export const getPostsFailure = createAction('GET_POSTS_FAILURE');
export const updatePostsRequest = createAction('UPDATE_POSTS_REQUEST');
export const updatePostsSuccess = createAction('UPDATE_POSTS_SUCCESS');
export const updatePostsFailure = createAction('UPDATE_POSTS_FAILURE');
export const likePostsRequest = createAction('LIKE_POSTS_REQUEST');
export const likePostsSuccess = createAction('LIKE_POSTS_SUCCESS');
export const likePostsFailure = createAction('LIKE_POSTS_FAILURE');
export const unlikePostsRequest = createAction('UNLIKE_POSTS_REQUEST');
export const unlikePostsSuccess = createAction('UNLIKE_POSTS_SUCCESS');
export const unlikePostsFailure = createAction('UNLIKE_POSTS_FAILURE');
export const deletePostsRequest = createAction('DELETE_POSTS_REQUEST');
export const deletePostsSuccess = createAction('DELETE_POSTS_SUCCESS');
export const deletePostsFailure = createAction('DELETE_POSTS_FAILURE');
export const addPost_ActionCreatorRequest = createAction('ADD_POST_REQUEST');
export const addPost_ActionCreatorSuccess = createAction('ADD_POST_SUCCESS');
export const addPost_ActionCreatorFailure = createAction('ADD_POST_FAILURE');
export const createCommentRequest = createAction('CREATE_COMMENT_REQUEST');
export const createCommentSuccess = createAction('CREATE_COMMENT_SUCCESS');
export const createCommentFailure = createAction('CREATE_COMMENT_FAILURE');
export const deleteCommentRequest = createAction('DELETE_COMMENT_REQUEST');
export const deleteCommentSuccess = createAction('DELETE_COMMENT_SUCCESS');
export const deleteCommentFailure = createAction('DELETE_COMMENT_FAILURE');
export const addCommentRequest = createAction('ADD_COMMENT_REQUEST');
export const addCommentSuccess = createAction('ADD_COMMENT_SUCCESS');
export const addCommentFailure = createAction('ADD_COMMENT_FAILURE');


