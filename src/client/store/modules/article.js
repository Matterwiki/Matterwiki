import {
  ADD_ARTICLES,
  EMPTY_ARTICLES,
  START_LOADING_ARTICLES,
  STOP_LOADING_ARTICLES,
  SET_CURRENT_ARTICLE,
  EMPTY_CURRENT_ARTICLE
} from "store/actionTypes";

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

export default (
  state = {
    articles: [],
    currentArticle: {},
    loading: false
  },
  payload
) => {
  switch (payload.type) {
    case ADD_ARTICLES:
      return {
        ...state,
        articles: payload.articles
      };
    case EMPTY_ARTICLES:
      return {
        ...state,
        articles: []
      };
    case SET_CURRENT_ARTICLE:
      return {
        ...state,
        currentArticle: payload.article
      };
    case EMPTY_CURRENT_ARTICLE:
      return {
        ...state,
        currentArticle: {}
      };
    case START_LOADING_ARTICLES:
      return {
        ...state,
        loading: true
      };
    case STOP_LOADING_ARTICLES:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
};
