import { SUGGES_TYPES } from './action';
import { GLOBALTYPES } from '../actions/globalTypes';

const initialState = {
    loading: true,
    users: [],
    friends:[],
    sended: [],
}


export default function reducer (state = initialState, action) {
    switch (action.type){
        case SUGGES_TYPES.LOADING_REQUEST:
            return {
                ...state,
                loading: action.payload
            };
        case GLOBALTYPES.SET_FOLLOWING_REQUEST: {
            return {
                ...state,
                sended: action.payload
            }
        }
        case GLOBALTYPES.ADD_FOLLOWING_REQUEST: {
            return {
                ...state,
                sended: [
                    ...state.sended.map(e => e),
                    action.payload
                ]
            }
        }
        case GLOBALTYPES.REMOVE_FOLLOWING_REQUEST: {
            return {
                ...state,
                sended: state.sended.filter(user => user.userId !== action.payload)
            }
        }
        case SUGGES_TYPES.LOADING_SUCCESS:
            return {
                ...state,
                loading: action.payload
            };
        case SUGGES_TYPES.GET_USERS_REQUEST:
            return {
                ...state,
                users: [...action.payload]
            }
        case SUGGES_TYPES.GET_USERS_SUCCESS:
            return {
                ...state,
                users: [...action.payload]
            }
        case GLOBALTYPES.GET_FRIENDS_REQUEST:
            return {
                ...state,
                friends: action.payload
            }
        case GLOBALTYPES.GET_FRIENDS_SUCCESS:
            return {
                ...state,
                friends: action.payload
            }
        case GLOBALTYPES.DELETE_FRIENDS_REQUEST:
            return {
                ...state,
                friends: action.payload
            }
        case GLOBALTYPES.DELETE_FRIENDS_SUCCESS:
            return {
                ...state,
                friends: action.payload
            }
        case SUGGES_TYPES.REMOVE_USER_REQUEST:
            return {
                ...state,
                users: state.users.filter(user => user.id !== action.payload.id)
            };
        case SUGGES_TYPES.REMOVE_USER_SUCCESS:
            return {
                ...state,
                users: state.users.filter(user => user.id !== action.payload.id)
            };
        default:
            return state;
    }
}


export const SetSended_ActionCreator = (payload) => {
    return {
        type: GLOBALTYPES.SET_FOLLOWING_REQUEST,
        payload
    }
}

export const AddSendedRequest_ActionCreator = (payload) => {
    return {
        type: GLOBALTYPES.ADD_FOLLOWING_REQUEST,
        payload
    }
}

export const RemoveSendedRequest_ActionCreator = (payload) => {
    return {
        type: GLOBALTYPES.REMOVE_FOLLOWING_REQUEST,
        payload
    }
}
