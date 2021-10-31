import { handleActions } from 'redux-actions';
import {
    getPostsRequest,
    getPostsSuccess,
    getPostsFailure,
    createPostsRequest,
    createPostsSuccess,
    createPostsFailure,
    updatePostsRequest,
    updatePostsSuccess,
    updatePostsFailure,
    likePostsRequest,
    likePostsSuccess,
    likePostsFailure,
    unlikePostsRequest,
    unlikePostsSuccess,
    unlikePostsFailure,
    deletePostsRequest,
    deletePostsSuccess,
    deletePostsFailure,
    addPost_ActionCreatorSuccess,
    createCommentFailure,
    createCommentRequest,
    createCommentSuccess,
    deleteCommentFailure,
    deleteCommentSuccess,
    addCommentRequest,
    addCommentSuccess,
    addCommentFailure, SET_REFRESH
} from './action';


const initialState = {
    isGettingPosts: false,
    isGettingPostsSuccess:false,
    isGettingPostsFailure:false,
    isDeletePosts: false,
    isDeletePostsSuccess:false,
    isDeletePostsFailure:false,
    isAddComments: false,
    isAddCommentsSuccess:false,
    isAddCommentsFailure:false,
    posts:[],
    errorMessages:'',
    page: 2,
    count: 0,
    refresh:0
}

const reducer = handleActions({

    // Post

    [createPostsSuccess]: (state, {payload})=>{
        return {
            ...state,
            isGettingPosts: false,
            isGettingPostsSuccess: true,
            posts: payload.rows,
        }
    },
    [createPostsFailure]: (state, {payload})=>({
        ...state,
        isGettingPosts: false,
        isGettingPostsFailure:true,
        errorMessages: payload,
    }),

    [addPost_ActionCreatorSuccess]: ((state, {payload}) => {
    const posts = [...state.posts.map(p => p), ...payload.rows];
        return {
            ...state,
            posts,
            page: state.page + 1,
            count: payload.count
        };
    }),

    [getPostsRequest]: (state)=>({
        ...state,
        isGettingPosts: true,
        isGettingPostsSuccess:false,
        isGettingPostsFailure:false,
    }),

    [getPostsSuccess]: (state, {payload})=>{
        return {
            ...state,
            isGettingPosts: false,
            isGettingPostsSuccess: true,
            posts: payload.rows,
            count: payload.count
        }
    },

    [getPostsFailure]: (state, {payload})=>({
        ...state,
        isGettingPosts: false,
        isGettingPostsFailure:true,
        errorMessages: payload,
    }),

    [updatePostsRequest]: (state)=>({
        ...state,
        isGettingPosts: true,
        isGettingPostsSuccess:false,
        isGettingPostsFailure:false,
    }),

    [updatePostsSuccess]: (state, {payload})=>{
        return {
            ...state,
            isGettingPosts: false,
            isGettingPostsSuccess: true,
            posts: payload.rows,
        }
    },

    [updatePostsFailure]: (state, {payload})=>({
        ...state,
        isGettingPosts: false,
        isGettingPostsFailure:true,
        errorMessages: payload,
    }),

    // Likes

    [likePostsRequest]: (state)=>({
        ...state,
        isGettingPosts: true,
        isGettingPostsSuccess:false,
        isGettingPostsFailure:false,
    }),

    [likePostsSuccess]: (state, {payload})=>{
        return {
            ...state,
            isGettingPosts: false,
            isGettingPostsSuccess: true,
            posts: payload.rows,
        }
    },

    [likePostsFailure]: (state, {payload})=>({
        ...state,
        isGettingPosts: false,
        isGettingPostsFailure:true,
        errorMessages: payload,
    }),

    [unlikePostsRequest]: (state)=>({
        ...state,
        isGettingPosts: true,
        isGettingPostsSuccess:false,
        isGettingPostsFailure:false,
    }),

    [unlikePostsSuccess]: (state, {payload})=>{
        return {
            ...state,
            isGettingPosts: false,
            isGettingPostsSuccess: true,
            posts: payload.rows,
        }
    },

    [unlikePostsFailure]: (state, {payload})=>({
        ...state,
        isGettingPosts: false,
        isGettingPostsFailure:true,
        errorMessages: payload,
    }),

    [deletePostsRequest]: (state)=>({
        ...state,
        isDeletePosts: true,
        isDeletePostsSuccess:false,
        isDeletePostsFailure:false,
    }),

    [deletePostsSuccess]: (state, {payload})=>{
        return {
            ...state,
            isDeletePosts: false,
            isDeletePostsSuccess: true,
            posts: state.posts.filter(state.post.id !== payload.id),
        }
    },

    [deletePostsFailure]: (state, {payload})=>({
        ...state,
        isDeletePosts: false,
        isDeletePostsFailure:true,
        errorMessages: payload,
    }),

    // Comment

    [createCommentSuccess]: ((state, {payload})=> {
        return {
            ...state,
            posts: state.posts.map(post => {
                if (post.id === payload.postId) {
                    return {
                        ...post,
                        commentPost: [...post.commentPost.map(c => c), payload]
                    }
                }
                return post
            })
        }
    }),

    [deleteCommentSuccess]: ((state, {payload}) => {
        return {
            ...state,
            posts: state.posts.map(post => {
                if (post.id === payload.postId) {
                    return {
                        ...post,
                        commentPost: post.commentPost.filter(p => p.id !== payload.id)
                    }
                }
                return post
            })
        }
    }),

    [createCommentRequest]:( (state)=>{
        return {
            ...state,
            isCreatedComment: true,
            isCreatedCommentSuccess:false,
            isCreatedCommentFailure:false,
        }
    }),

    [createCommentFailure]: (state, {payload})=>({
        ...state,
        isCreatedComment: false,
        isCreatedCommentFailure:true,
        errorMessages: payload,
    }),

    [deleteCommentFailure]:( (state, {payload})=>{
        return {
            ...state,
            isDeletedComment: false,
            isDeletedCommentFailure:true,
            errorMessages: payload,
        }
    }),

    [addCommentSuccess]: ((state, {payload}) => {
        debugger
        return {
            ...state,
            posts: state.posts.map(post => {
                if (post.id === payload.postId) {
                    return {
                        ...post,
                        commentPost: [...post.commentPost.map(c => c).push(...post),payload]
                    }
                }
                return post;
            })
        }
    }),

    [addCommentFailure]:( (state, {payload})=>{
        return {
            ...state,
            isAddComments: false,
            isAddCommentsFailure:true,
            errorMessages: payload,
        }
    }),


}, initialState);

export default reducer;

