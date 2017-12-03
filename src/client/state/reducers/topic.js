import {
  ADD_TOPICS,
  START_LOADING_TOPICS,
  STOP_LOADING_TOPICS
} from "state/actions/types";

export default (
  state = {
    topics: [],
    loading: false
  },
  payload
) => {
  switch (payload.type) {
    case ADD_TOPICS:
      return {
        ...state,
        topics: payload.topics
      };
    case START_LOADING_TOPICS:
      return {
        ...state,
        loading: true
      };
    case STOP_LOADING_TOPICS:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
};
