import { ADD_TOPICS } from "state/actions/types";

export default (state = [], payload) => {
  switch (payload.type) {
    case ADD_TOPICS:
      return payload.topics;
    default:
      return state;
  }
};
