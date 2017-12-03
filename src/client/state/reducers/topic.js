import { ADD_TOPICS, START_LOADING, STOP_LOADING } from "state/actions/types";

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
    case START_LOADING:
      return {
        ...state,
        loading: true
      };
    case STOP_LOADING:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
};
