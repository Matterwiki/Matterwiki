/* eslint-disable */
import {
  ADD_USERS,
  EMPTY_USERS,
  START_LOADING_USERS,
  STOP_LOADING_USERS,
  SET_CURRENT_USER,
  EMPTY_CURRENT_USER
} from "state/actions/types";

export const addUsers = users => {
  return {
    type: ADD_USERS,
    users
  };
};

export const emptyUsers = () => {
  return {
    type: EMPTY_USERS
  };
};

export const startLoading = () => {
  return {
    type: START_LOADING_USERS
  };
};

export const stopLoading = () => {
  return {
    type: STOP_LOADING_USERS
  };
};

export const setCurrentUser = user => {
  return {
    type: SET_CURRENT_USER,
    user
  };
};

export const emptyCurrentUser = () => {
  return {
    type: EMPTY_CURRENT_USER
  };
};
