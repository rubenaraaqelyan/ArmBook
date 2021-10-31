import {createAction} from "redux-actions";

export const loginUserRequest = createAction('LOGIN_USERS_REQUEST');
export const loginUsersSuccess = createAction('LOGIN_USERS_SUCCESS');
export const loginUsersFailure = createAction('LOGIN_USERS_FAILURE');
export const registerUserRequest = createAction('REGISTER_USERS_REQUEST');
export const registerUsersSuccess = createAction('REGISTER_USERS_SUCCESS');
export const registerUsersFailure = createAction('REGISTER_USERS_FAILURE');
