import {
  ADD_TOPICS,
  EMPTY_TOPICS,
  START_LOADING_TOPICS,
  STOP_LOADING_TOPICS,
  SET_CURRENT_TOPIC,
  EMPTY_CURRENT_TOPIC
} from "./types";

export const addTopics = topics => ({
  type: ADD_TOPICS,
  topics
});

export const emptyTopics = () => ({
  type: EMPTY_TOPICS
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
