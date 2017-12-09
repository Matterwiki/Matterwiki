import { START_LOADING_APP, STOP_LOADING_APP } from "state/actions/types";

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
