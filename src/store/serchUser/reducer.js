import { handleActions } from 'redux-actions';
import { searchUsersFailure, searchUsersRequest, searchUsersSuccess } from './action';


const initialState = {
    isSearchingUsers: false,
    isSearchingUsersSuccess:false,
    isSearchingUsersFailure:false,
    usersList:[],
    errorMessages:'',
}

const reducer = handleActions({
    [searchUsersRequest]: (state)=>({
        ...state,
        isSearchingUsers: true,
        isSearchingUsersSuccess:false,
        isSearchingUsersFailure:false,
    }),
    [searchUsersSuccess]: (state, {payload})=>({
        ...state,
        isSearchingUsers: false,
        isSearchingUsersSuccess:true,
        usersList: payload.users,
    }),
    [searchUsersFailure]: (state, {payload})=>({
        ...state,
        isSearchingUsers: false,
        isSearchingUsersFailure:true,
        errorMessages: payload,
    })
},initialState)

export default reducer;
