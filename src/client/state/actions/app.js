import { START_LOADING_APP, STOP_LOADING_APP } from "./types";

export const startLoadingApp = () => ({
  type: START_LOADING_APP
});

export const stopLoadingApp = () => ({
  type: STOP_LOADING_APP
});
