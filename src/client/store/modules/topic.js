import {
  ADD_TOPICS,
  EMPTY_TOPICS,
  APPEND_TOPICS,
  START_LOADING_TOPICS,
  STOP_LOADING_TOPICS,
  SET_CURRENT_TOPIC,
  EMPTY_CURRENT_TOPIC
} from "store/actionTypes";

export const addTopics = ({ topics, meta }) => ({
  type: ADD_TOPICS,
  topics,
  meta
});

export const emptyTopics = () => ({
  type: EMPTY_TOPICS
});

export const appendTopics = ({ topics, meta }) => ({
  type: APPEND_TOPICS,
  topics,
  meta
});

export const startLoadingTopics = () => ({
  type: START_LOADING_TOPICS
});

export const stopLoadingTopics = () => ({
  type: STOP_LOADING_TOPICS
});

export const setCurrentTopic = topic => ({
  type: SET_CURRENT_TOPIC,
  topic
});

export const emptyCurrentTopic = () => ({
  type: EMPTY_CURRENT_TOPIC
});

export default (
  state = {
    topics: {
      all: [],
      meta: {}
    },
    loading: false,
    currentTopic: null
  },
  payload
) => {
  switch (payload.type) {
    case ADD_TOPICS:
      return {
        ...state,
        topics: {
          all: payload.topics,
          meta: payload.meta
        }
      };
    case EMPTY_TOPICS:
      return {
        ...state,
        topics: {
          all: [],
          meta: {}
        }
      };
    case APPEND_TOPICS:
      return {
        ...state,
        topics: {
          all: [...state.topics.all, ...payload.topics],
          meta: payload.meta
        }
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
