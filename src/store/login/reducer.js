import { handleActions } from "redux-actions";
import {
    loginUsersFailure,
    loginUserRequest,
    loginUsersSuccess,
    registerUserRequest,
    registerUsersSuccess, registerUsersFailure
} from './action';


const initialState = {
    isLoginUser: false,
    isLoginUserSuccess:false,
    isLoginUserFailure:false,
    isRegisterUser:false,
    isRegisterUserSuccess:false,
    isRegisterUserFailure:false,
    token:'',
    errorMessages:'',
    user:[],
}

const reducer = handleActions({
    [loginUserRequest]: (state)=>({
        ...state,
        isLoginUser: true,
        isLoginUserSuccess:false,
        isLoginUserFailure:false,
    }),
    [loginUsersSuccess]: (state, {payload})=>({
        ...state,
        isLoginUser: false,
        isLoginUserSuccess:true,
        token: payload.access_token,
        user:payload.user,
    }),
    [loginUsersFailure]: (state, {payload})=>({
        ...state,
        isLoginUser: false,
        isLoginUserFailure:true,
        errorMessages: payload,
    }),
    [registerUserRequest]: (state)=>({
        ...state,
        isRegisterUser: true,
        isRegisterUserSuccess:false,
        isRegisterUserFailure:false,
    }),
    [registerUsersSuccess]: (state, {payload})=>({
        ...state,
        isRegisterUser: false,
        isRegisterUserSuccess:true,
        token: payload.access_token,
        user:payload.user,
    }),
    [registerUsersFailure]: (state, {payload})=>({
        ...state,
        isRegisterUser: false,
        isRegisterUserFailure:true,
        errorMessages: payload,
    })
},initialState)

export default reducer;
