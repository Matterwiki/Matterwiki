import {
  SET_ARTICLE_SEARCH_QUERY,
  EMPTY_ARTICLE_SEARCH_QUERY,
  ADD_ARTICLE_SEARCH_RESULTS,
  EMPTY_ARTICLE_SEARCH_RESULTS,
  START_LOADING_ARTICLE_SEARCH_RESULTS,
  STOP_LOADING_ARTICLE_SEARCH_RESULTS
} from "store/actionTypes";

export const setArticleSearchQuery = query => ({
  type: SET_ARTICLE_SEARCH_QUERY,
  query
});

export const emptyArticleSearchQuery = () => ({
  type: EMPTY_ARTICLE_SEARCH_QUERY
});

export const addSearchResults = results => ({
  type: ADD_ARTICLE_SEARCH_RESULTS,
  results
});

export const emptySearchResults = results => ({
  type: EMPTY_ARTICLE_SEARCH_RESULTS
});

export const startLoadingSearchResults = () => ({
  type: START_LOADING_ARTICLE_SEARCH_RESULTS
});

export const stopLoadingSearchResults = () => ({
  type: STOP_LOADING_ARTICLE_SEARCH_RESULTS
});

export default (
  state = {
    query: null,
    results: [],
    loading: false
  },
  payload
) => {
  switch (payload.type) {
    case SET_ARTICLE_SEARCH_QUERY:
      return {
        ...state,
        query: payload.query
      };
    case EMPTY_ARTICLE_SEARCH_QUERY:
      return {
        ...state,
        query: null
      };
    case ADD_ARTICLE_SEARCH_RESULTS:
      return {
        ...state,
        results: payload.results
      };
    case EMPTY_ARTICLE_SEARCH_RESULTS:
      return {
        ...state,
        results: []
      };
    case START_LOADING_ARTICLE_SEARCH_RESULTS:
      return {
        ...state,
        loading: true
      };
    case STOP_LOADING_ARTICLE_SEARCH_RESULTS:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
};
