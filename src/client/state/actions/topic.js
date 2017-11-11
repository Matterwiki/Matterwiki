/* eslint-disable */
import { ADD_TOPICS } from "./types";

export const addTopics = topics => {
  return {
    type: ADD_TOPICS,
    topics
  };
};
