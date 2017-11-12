import { fork } from "redux-saga/effects";
import setupSaga from "./setupSaga";

function* rootSaga() {
  yield fork(setupSaga);
}

export default rootSaga;
