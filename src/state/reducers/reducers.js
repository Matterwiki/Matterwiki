import { SETUP_SUCCESS, SETUP_FAILURE } from "../actions/constants";

function reducer(state = {}, action) {
  switch (action.type) {
    case SETUP_SUCCESS:
      return state;
    case SETUP_FAILURE:
      return state;
    default:
      return state;
  }
}

export default { reducer };
