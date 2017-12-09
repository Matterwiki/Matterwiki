/* eslint-disable */
import {
  LOAD_HOMEPAGE,
  DISPOSE_HOMEPAGE,
  FETCH_ARTICLE_BY_TOPIC,
  LOAD_ARTICLE_PAGE,
  DISPOSE_ARTICLE_PAGE
} from "./types";

export const loadHomepage = () => {
  return {
    type: LOAD_HOMEPAGE
  };
};

export const disposeHomepage = () => {
  return {
    type: DISPOSE_HOMEPAGE
  };
};

export const fetchArticlesByTopic = id => {
  return {
    type: FETCH_ARTICLES_BY_TOPIC,
    id
  };
};

export const loadArticlePage = id => {
  return {
    type: LOAD_ARTICLE_PAGE,
    id
  };
};

export const disposeArticlePage = () => {
  return {
    type: DISPOSE_ARTICLE_PAGE
  };
};
