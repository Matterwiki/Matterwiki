/* eslint-disable */
import { ADD_TOPICS, START_LOADING, STOP_LOADING } from "./types";

export const addTopics = topics => {
  return {
    type: ADD_TOPICS,
    topics
  };
};

export const startLoading = () => {
  return {
    type: START_LOADING
  };
};

export const stopLoading = () => {
  return {
    type: STOP_LOADING
  };
};
