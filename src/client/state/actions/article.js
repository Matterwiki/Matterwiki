import {
  ADD_ARTICLES,
  EMPTY_ARTICLES,
  START_LOADING_ARTICLES,
  STOP_LOADING_ARTICLES,
  SET_CURRENT_ARTICLE,
  EMPTY_CURRENT_ARTICLE
} from "./types";

export const addArticles = articles => ({
  type: ADD_ARTICLES,
  articles
});

export const emptyArticles = () => ({
  type: EMPTY_ARTICLES
});

export const setCurrentArticle = article => ({
  type: SET_CURRENT_ARTICLE,
  article
});

export const emptyCurrentArticle = () => ({
  type: EMPTY_CURRENT_ARTICLE
});

export const startLoadingArticles = () => ({
  type: START_LOADING_ARTICLES
});

export const stopLoadingArticles = () => ({
  type: STOP_LOADING_ARTICLES
});
