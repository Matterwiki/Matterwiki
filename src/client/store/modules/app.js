import { START_LOADING_APP, STOP_LOADING_APP } from "store/actionTypes";

export const startLoadingApp = () => ({
  type: START_LOADING_APP
});

export const stopLoadingApp = () => ({
  type: STOP_LOADING_APP
});

export default (
  state = {
    loading: false
  },
  payload
) => {
  switch (payload.type) {
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
