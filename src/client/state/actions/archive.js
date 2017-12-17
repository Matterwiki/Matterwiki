import {
  ADD_ARCHIVES,
  EMPTY_ARCHIVES,
  START_LOADING_ARCHIVES,
  STOP_LOADING_ARCHIVES,
  SET_CURRENT_ARCHIVE,
  EMPTY_CURRENT_ARCHIVE
} from "./types";

export const addArchives = archives => ({
  type: ADD_ARCHIVES,
  archives
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
