/* eslint-disable */
import { ADD_TOPICS, START_LOADING_TOPICS, STOP_LOADING_TOPICS } from "./types";

export const addTopics = topics => {
  return {
    type: ADD_TOPICS,
    topics
  };
};

export const startLoading = () => {
  return {
    type: START_LOADING_TOPICS
  };
};

export const stopLoading = () => {
  return {
    type: STOP_LOADING_TOPICS
  };
};
