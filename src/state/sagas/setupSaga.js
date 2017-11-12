import { take, call, put } from "redux-saga/effects";
import { push } from "react-router-redux";

import {
  SETUP_REQUEST,
  SETUP_SUCCESS,
  SETUP_FAILURE
} from "../actions/constants";

import APIProvider from "../../utils/APIProvider";

export default function* registerFlow() {
  while (true) {
    const request = yield take(SETUP_REQUEST);

    try {
      yield call(APIProvider.post, "setup", request.data);
      yield put({ type: SETUP_SUCCESS });
      yield put(push("/login"));
    } catch (err) {
      yield put({ type: SETUP_FAILURE, error: err.message });
    }
  }
}
