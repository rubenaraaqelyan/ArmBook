import { createAction } from 'redux-actions';

export const searchUsersRequest = createAction('SEARCH_USERS_REQUEST');
export const searchUsersSuccess = createAction('SEARCH_USERS_SUCCESS');
export const searchUsersFailure = createAction('SEARCH_USERS_FAILURE');
