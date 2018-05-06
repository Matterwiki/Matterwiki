import {
  ADD_ARCHIVES,
  EMPTY_ARCHIVES,
  START_LOADING_ARCHIVES,
  STOP_LOADING_ARCHIVES,
  SET_CURRENT_ARCHIVE,
  EMPTY_CURRENT_ARCHIVE,
  APPEND_ARCHIVES
} from "store/actionTypes";

export const addArchives = ({ archives, meta }) => ({
  type: ADD_ARCHIVES,
  archives,
  meta
});

export const appendArchives = ({ archives, meta }) => ({
  type: APPEND_ARCHIVES,
  archives,
  meta
});

export const emptyArchives = () => ({
  type: EMPTY_ARCHIVES
});

export const startLoadingArchives = () => ({
  type: START_LOADING_ARCHIVES
});

export const stopLoadingArchives = () => ({
  type: STOP_LOADING_ARCHIVES
});

export const setCurrentArchive = archive => ({
  type: SET_CURRENT_ARCHIVE,
  archive
});

export const emptyCurrentArchive = () => ({
  type: EMPTY_CURRENT_ARCHIVE
});

export default (
  state = {
    archives: {
      all: [],
      meta: {}
    },
    loading: false,
    currentArchive: null
  },
  payload
) => {
  switch (payload.type) {
    case ADD_ARCHIVES:
      return {
        ...state,
        archives: {
          all: payload.archives,
          meta: payload.meta
        }
      };
    case EMPTY_ARCHIVES:
      return {
        ...state,
        archives: {
          all: [],
          meta: {}
        }
      };
    case APPEND_ARCHIVES:
      return {
        ...state,
        archives: {
          all: [...state.archives.all, ...payload.archives],
          meta: payload.meta
        }
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
