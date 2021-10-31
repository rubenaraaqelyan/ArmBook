import { DISCOVER_TYPES } from './action';

const initialState = {
    loading: false,
    posts: [],
    result: 9,
    page: 2,
    firstLoad: false
}

const reducer = (state = initialState, action) => {
    switch (action.type){
        case DISCOVER_TYPES.LOADING_REQUEST:
            return {
                ...state,
                loading: action.payload
            };
        case DISCOVER_TYPES.LOADING_SUCCESS:
            return {
                ...state,
                loading: action.payload
            };
        case DISCOVER_TYPES.GET_POSTS_REQUEST:
            return {
                ...state,
                posts: action.payload.posts,
                result: action.payload.result,
                firstLoad: true
            };
        case DISCOVER_TYPES.GET_POSTS_SUCCESS:
            return {
                ...state,
                posts: action.payload.posts,
                result: action.payload.result,
                firstLoad: true
            };
        case DISCOVER_TYPES.UPDATE_POST_REQUEST:
            return {
                ...state,
                posts: action.payload.posts,
                result: action.payload.result,
                page: state.page + 1
            };
        case DISCOVER_TYPES.UPDATE_POST_SUCCESS:
            return {
                ...state,
                posts: action.payload.posts,
                result: action.payload.result,
                page: state.page + 1
            };
        default:
            return state;
    }
}

export default reducer;
