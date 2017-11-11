import { ADD_ARTICLES } from "state/actions/types";

export default (state = [], payload) => {
  switch (payload.type) {
    case ADD_ARTICLES:
      return payload.articles;
    default:
      return state;
  }
};
