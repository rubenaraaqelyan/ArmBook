import { POST_TYPES } from './action';
import { DeleteData } from '../actions/globalTypes';

const initialState = {
    loading: false,
    posts: [],
    result: 0,
}

const reducer = (state = initialState, action) => {
    switch (action.type){
        case POST_TYPES.CREATE_POST_REQUEST:
            return {
                ...state,
                posts: [action.payload, ...state.posts]
            };
        case POST_TYPES.CREATE_POST_SUCCESS:
            return {
                ...state,
                posts: [action.payload, ...state.posts]
            };
        case POST_TYPES.LOADING_POST_REQUEST:
            return {
                ...state,
                loading: action.payload
            };
        case POST_TYPES.LOADING_POST_SUCCESS:
            return {
                ...state,
                loading: action.payload
            };
        case POST_TYPES.GET_POSTS_REQUEST:
            return {
                ...state,
                posts: action.payload.rows,
            };
        case POST_TYPES.GET_POSTS_SUCCESS:
            return {
                ...state,
                posts: action.payload.rows,
            };
        case POST_TYPES.UPDATE_POST_SUCCESS:
            const posts = state.posts.map(post => {
                if (post.id === action.payload.id) {
                    return {  ...post, ...action.payload }
                }
                return post
            })
            return {
                ...state,
                posts
            };
        case POST_TYPES.DELETE_POST_REQUEST:
            return {
                ...state,
                posts: DeleteData(state.posts, action.payload.id)
            };
        case POST_TYPES.DELETE_POST_SUCCESS:
            return {
                ...state,
                posts: DeleteData(state.posts, action.payload.id)
            };
        default:
            return state;
    }
}

export default reducer;

