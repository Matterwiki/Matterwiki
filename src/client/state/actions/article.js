/* eslint-disable */
import { ADD_ARTICLES, EMPTY_ARTICLES } from "./types";

export const addArticles = articles => {
  return {
    type: ADD_ARTICLES,
    articles
  };
};

export const emptyArticles = () => {
  return {
    type: EMPTY_ARTICLES
  };
};
