/* eslint-disable */
import { START_LOADING_APP, STOP_LOADING_APP } from "./types";

export const startLoadingApp = () => {
  return {
    type: START_LOADING_APP
  };
};

export const stopLoadingApp = () => {
  return {
    type: STOP_LOADING_APP
  };
};
