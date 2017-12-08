import {
  ADD_ARCHIVES,
  EMPTY_ARCHIVES,
  START_LOADING_ARCHIVES,
  STOP_LOADING_ARCHIVES,
  SET_CURRENT_ARCHIVE,
  EMPTY_CURRENT_ARCHIVE
} from "../actions/types";

export default (
  state = {
    archives: [],
    loading: false,
    currentArchive: null
  },
  payload
) => {
  switch (payload.type) {
    case ADD_ARCHIVES:
      return {
        ...state,
        archives: payload.archives
      };
    case EMPTY_ARCHIVES:
      return {
        ...state,
        archives: []
      };
    case START_LOADING_ARCHIVES:
      return {
        ...state,
        loading: true
      };
    case STOP_LOADING_ARCHIVES:
      return {
        ...state,
        loading: false
      };
    case SET_CURRENT_ARCHIVE:
      return {
        ...state,
        currentArchive: payload.archive
      };
    case EMPTY_CURRENT_ARCHIVE:
      return {
        ...state,
        currentArchive: null
      };
    default:
      return state;
  }
};
