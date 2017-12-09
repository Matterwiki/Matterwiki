import {
  ADD_TOPICS,
  EMPTY_TOPICS,
  START_LOADING_TOPICS,
  STOP_LOADING_TOPICS,
  SET_CURRENT_TOPIC,
  EMPTY_CURRENT_TOPIC
} from "state/actions/types";

export default (
  state = {
    topics: [],
    loading: false,
    currentTopic: null
  },
  payload
) => {
  switch (payload.type) {
    case ADD_TOPICS:
      return {
        ...state,
        topics: payload.topics
      };
    case EMPTY_TOPICS:
      return {
        ...state,
        topics: []
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
    case SET_CURRENT_TOPIC:
      return {
        ...state,
        currentTopic: payload.topic
      };
    case EMPTY_CURRENT_TOPIC:
      return {
        ...state,
        currentTopic: null
      };
    default:
      return state;
  }
};
