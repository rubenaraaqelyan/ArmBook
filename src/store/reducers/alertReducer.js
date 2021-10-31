import { GLOBALTYPES } from '../actions/globalTypes';

const initialState = {}

const alertReducer = (state = initialState, action) => {
    switch (action.type){
        case GLOBALTYPES.ALERT_SUCCESS:
            return action.payload;
        default:
            return state;
    }
}


export default alertReducer;
