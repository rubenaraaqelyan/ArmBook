import { NOTIFY_TYPES } from './action';
import { EditData } from '../actions/globalTypes';

const initialState = {
    loading: false,
    data: [],
    sound: false
}

const reducer = (state = initialState, action) => {
    switch (action.type){
        case NOTIFY_TYPES.GET_NOTIFIES_REQUEST:
            return {
                ...state,
                data: action.payload
            };
        case NOTIFY_TYPES.GET_NOTIFIES_SUCCESS:
            return {
                ...state,
                data: action.payload
            };
        case NOTIFY_TYPES.CREATE_NOTIFY_REQUEST:
            return {
                ...state,
                data: [action.payload, ...state.data]
            };
        case NOTIFY_TYPES.CREATE_NOTIFY_SUCCESS:
            return {
                ...state,
                data: [action.payload, ...state.data]
            };
        case NOTIFY_TYPES.REMOVE_NOTIFY_REQUEST:
            return {
                ...state,
                data: state.data.filter(item => (
                    item.id !== action.payload.id || item.url !== action.payload.url
                ))
            };
        case NOTIFY_TYPES.REMOVE_NOTIFY_SUCCESS:
            return {
                ...state,
                data: state.data.filter(item => (
                    item.id !== action.payload.id || item.url !== action.payload.url
                ))
            };
        case NOTIFY_TYPES.UPDATE_NOTIFY_REQUEST:
            return {
                ...state,
                data: EditData(state.data, action.payload.id, action.payload)
            };
        case NOTIFY_TYPES.UPDATE_NOTIFY_SUCCESS:
            return {
                ...state,
                data: EditData(state.data, action.payload.id, action.payload)
            };
        case NOTIFY_TYPES.UPDATE_SOUND_REQUEST:
            return {
                ...state,
                sound: action.payload
            };
        case NOTIFY_TYPES.UPDATE_SOUND_SUCCESS:
            return {
                ...state,
                sound: action.payload
            };
        case NOTIFY_TYPES.DELETE_ALL_NOTIFIES_REQUEST:
            return {
                ...state,
                data: action.payload
            };
        case NOTIFY_TYPES.DELETE_ALL_NOTIFIES_SUCCESS:
            return {
                ...state,
                data: action.payload
            };
        default:
            return state;
    }
}


export default reducer;
