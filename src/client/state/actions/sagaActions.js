/* eslint-disable */
import {
  LOAD_HOMEPAGE,
  DISPOSE_HOMEPAGE,
  FETCH_ARTICLES_BY_TOPIC
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
