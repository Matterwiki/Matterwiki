import { ADD_ARTICLES, EMPTY_ARTICLES } from "state/actions/types";

export default (state = [], payload) => {
  switch (payload.type) {
    case ADD_ARTICLES:
      return payload.articles;
    case EMPTY_ARTICLES:
      return [];
    default:
      return state;
  }
};
