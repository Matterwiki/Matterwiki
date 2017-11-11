/* eslint-disable */
import { ADD_ARTICLES } from "./types";

export const addArticles = articles => {
  return {
    type: ADD_ARTICLES,
    articles
  };
};
