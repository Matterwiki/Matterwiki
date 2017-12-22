import {
  ADD_USERS,
  EMPTY_USERS,
  START_LOADING_USERS,
  STOP_LOADING_USERS,
  SET_CURRENT_USER,
  EMPTY_CURRENT_USER
} from "store/actionTypes";

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

export default (
  state = {
    users: [],
    loading: false,
    currentUser: null
  },
  payload
) => {
  switch (payload.type) {
    case ADD_USERS:
      return {
        ...state,
        users: payload.users
      };
    case EMPTY_USERS:
      return {
        ...state,
        users: []
      };
    case START_LOADING_USERS:
      return {
        ...state,
        loading: true
      };
    case STOP_LOADING_USERS:
      return {
        ...state,
        loading: false
      };
    case SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload.user
      };
    case EMPTY_CURRENT_USER:
      return {
        ...state,
        currentUser: null
      };
    default:
      return state;
  }
};
