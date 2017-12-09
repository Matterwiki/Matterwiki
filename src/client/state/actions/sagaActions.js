/* eslint-disable */
import { LOAD_HOMEPAGE, DISPOSE_HOMEPAGE } from "./types";

export const loadHomepage = () => {
  return {
    type: LOAD_HOMEPAGE
  };
};

export const disposeHomepage = () => {
  return {
    type: DISPOSE_HOMEPAGE
  };
};
