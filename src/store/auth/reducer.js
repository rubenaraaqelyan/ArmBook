import { GLOBALTYPES } from '../actions/globalTypes';


const initialState = {
    auth: null,
    authErrorMsg: null,
    loginBtnStatus: false,
    token: null,
    authReady: false,
    data:[],
}

const reducer = (state = initialState, action) => {
    switch (action.type){
        case GLOBALTYPES.AUTH_REQUEST:
            return { ...state, ...action.payload };
        case GLOBALTYPES.AUTH_SUCCESS:
            return { ...state, ...action.payload };
        case GLOBALTYPES.UPDATE_USER_DATA: {
            return {
                ...state,
                user: {
                    ...state.user,
                    ...action.payload
                }
            }
        }
        case GLOBALTYPES.AUTHREADY_REQUEST:
            return { ...state,
                ...action.payload }
        case GLOBALTYPES.AUTHREADY_SUCCESS:
            return { ...state,
                ...action.payload }
        case GLOBALTYPES.AUTH_ERROR_MSG: {
            return { ...state,
                authErrorMsg: action.payload }
        }
        case GLOBALTYPES.SET_LOGIN_BTN_STATUS: {
            return {
                ...state,
                loginBtnStatus: action.payload
            }
        }
        default:
            return state;
    }
}

export const AuthErrorMsg_ActionCreator = (payload) => {
    return {
        type: GLOBALTYPES.AUTH_ERROR_MSG,
        payload
    }
};

export const SetLoginBtn_ActionCreator = (payload) => {
    return {
        type: GLOBALTYPES.SET_LOGIN_BTN_STATUS,
        payload
    }
}

export const UpdateUserData_ActionCreator = (payload) => {
    return {
        type: GLOBALTYPES.UPDATE_USER_DATA,
        payload
    }
}



export default reducer;
