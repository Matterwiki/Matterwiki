import { START_LOADING_APP, SET_USER, UNSET_USER, STOP_LOADING_APP } from "store/actionTypes";

export const startLoadingApp = () => ({
  type: START_LOADING_APP
});

export const stopLoadingApp = () => ({
  type: STOP_LOADING_APP
});

export const setUser = user => ({
  type: SET_USER,
  user
});

export const unsetUser = () => ({
  type: UNSET_USER
});

export default (
  state = {
    loading: false,
    user: null
  },
  payload
) => {
  switch (payload.type) {
    case SET_USER:
      return {
        ...state,
        user: payload.user
      };
    case UNSET_USER:
      return {
        ...state,
        user: null
      };
    case START_LOADING_APP:
      return {
        ...state,
        loading: true
      };
    case STOP_LOADING_APP:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
};
