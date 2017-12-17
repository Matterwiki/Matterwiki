import {
  ADD_USERS,
  EMPTY_USERS,
  START_LOADING_USERS,
  STOP_LOADING_USERS,
  SET_CURRENT_USER,
  EMPTY_CURRENT_USER
} from "state/actions/types";

export const addUsers = users => ({
  type: ADD_USERS,
  users
});

export const emptyUsers = () => ({
  type: EMPTY_USERS
});

export const startLoadingUsers = () => ({
  type: START_LOADING_USERS
});

export const stopLoadingUsers = () => ({
  type: STOP_LOADING_USERS
});

export const setCurrentUser = user => ({
  type: SET_CURRENT_USER,
  user
});

export const emptyCurrentUser = () => ({
  type: EMPTY_CURRENT_USER
});
