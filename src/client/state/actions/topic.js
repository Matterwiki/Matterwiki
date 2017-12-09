/* eslint-disable */
import {
  ADD_TOPICS,
  EMPTY_TOPICS,
  START_LOADING_TOPICS,
  STOP_LOADING_TOPICS,
  SET_CURRENT_TOPIC,
  EMPTY_CURRENT_TOPIC
} from "./types";

export const addTopics = topics => {
  return {
    type: ADD_TOPICS,
    topics
  };
};

export const emptyTopics = () => {
  return {
    type: EMPTY_TOPICS
  };
};

export const startLoadingTopics = () => {
  return {
    type: START_LOADING_TOPICS
  };
};

export const stopLoadingTopics = () => {
  return {
    type: STOP_LOADING_TOPICS
  };
};

export const setCurrentTopic = topic => {
  return {
    type: SET_CURRENT_TOPIC,
    topic
  };
};

export const emptyCurrentTopic = () => {
  return {
    type: EMPTY_CURRENT_TOPIC
  };
};
