import { PROFILE_TYPES } from './action';
import { EditData } from '../actions/globalTypes';

const initialState = {
    loading: false,
    ids: [],
    users: [],
    posts: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case PROFILE_TYPES.LOADING_REQUEST:
            return {
                ...state,
                loading: action.payload
            };
        case PROFILE_TYPES.LOADING_SUCCESS:
            return {
                ...state,
                loading: action.payload
            };
        case PROFILE_TYPES.GET_USER_REQUEST:
            return {
                ...state,
                users: [action.payload.user]
            };
        case PROFILE_TYPES.GET_USER_SUCCESS:
            return {
                ...state,
                users: [action.payload.user]
            };
        case PROFILE_TYPES.FOLLOW_REQUEST:
            return {
                ...state,
                users: EditData(state.users, action.payload.id, action.payload)
            };
        case PROFILE_TYPES.FOLLOW_SUCCESS:
            return {
                ...state,
                users: EditData(state.users, action.payload.id, action.payload)
            };
        case PROFILE_TYPES.UNFOLLOW_REQUEST:
            return {
                ...state,
                users: EditData(state.users, action.payload.id, action.payload)
            };
        case PROFILE_TYPES.UNFOLLOW_SUCCESS:
            return {
                ...state,
                users: EditData(state.users, action.payload.id, action.payload)
            };
        case PROFILE_TYPES.GET_ID:
            return {
                ...state,
                ids: [...state.ids, action.payload]
            };
        case PROFILE_TYPES.GET_POSTS_SUCCESS:
            return {
                ...state,
                posts: [...state.posts, action.payload]
            };
        case PROFILE_TYPES.UPDATE_POST_REQUEST:
            return {
                ...state,
                posts: EditData(state.posts, action.payload.id, action.payload)
            };
        case PROFILE_TYPES.UPDATE_POST_SUCCESS:
            return {
                ...state,
                posts: EditData(state.posts, action.payload.id, action.payload)
            };
        default:
            return state;
    }
}

export default reducer;

