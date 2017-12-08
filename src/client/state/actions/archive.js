/* eslint-disable */
import {
  ADD_ARCHIVES,
  EMPTY_ARCHIVES,
  START_LOADING_ARCHIVES,
  STOP_LOADING_ARCHIVES,
  SET_CURRENT_ARCHIVE,
  EMPTY_CURRENT_ARCHIVE
} from "./types";

export const addArchives = archives => {
  return {
    type: ADD_ARCHIVES,
    archives
  };
};

export const emptyArchives = () => {
  return {
    type: EMPTY_ARCHIVES
  };
};

export const startLoading = () => {
  return {
    type: START_LOADING_ARCHIVES
  };
};

export const stopLoading = () => {
  return {
    type: STOP_LOADING_ARCHIVES
  };
};

export const setCurrentArchive = archive => {
  return {
    type: SET_CURRENT_ARCHIVE,
    archive
  };
};

export const emptyCurrentArchive = () => {
  return {
    type: EMPTY_CURRENT_ARCHIVE
  };
};
