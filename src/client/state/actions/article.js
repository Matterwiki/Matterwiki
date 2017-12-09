/* eslint-disable */
import {
  ADD_ARTICLES,
  EMPTY_ARTICLES,
  START_LOADING_ARTICLES,
  STOP_LOADING_ARTICLES,
  SET_CURRENT_ARTICLE,
  EMPTY_CURRENT_ARTICLE
} from "./types";

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

export const setCurrentArticle = article => {
  return {
    type: SET_CURRENT_ARTICLE,
    article
  };
};

export const emptyCurrentArticle = () => {
  return {
    type: EMPTY_CURRENT_ARTICLE
  };
};

export const startLoadingArticles = () => {
  return {
    type: START_LOADING_ARTICLES
  };
};

export const stopLoadingArticles = () => {
  return {
    type: STOP_LOADING_ARTICLES
  };
};
