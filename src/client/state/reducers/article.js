import {
  ADD_ARTICLES,
  EMPTY_ARTICLES,
  SET_CURRENT_ARTICLE,
  EMPTY_CURRENT_ARTICLE,
  START_LOADING_ARTICLES,
  STOP_LOADING_ARTICLES
} from "state/actions/types";

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
