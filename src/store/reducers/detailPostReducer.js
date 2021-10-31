import { POST_TYPES } from '../post/action';
import { EditData } from '../actions/globalTypes';

const detailPostReducer = (state = [], action) => {
    switch (action.type){
        case POST_TYPES.GET_POST_REQUEST:
            return [...state, action.payload]
        case POST_TYPES.GET_POST_SUCCESS:
            return [...state, action.payload]
        case POST_TYPES.UPDATE_POST_REQUEST:
            return EditData(state, action.payload.id, action.payload)
        case POST_TYPES.UPDATE_POST_SUCCESS:
            return EditData(state, action.payload.id, action.payload)
        default:
            return state;
    }
}


export default detailPostReducer;
