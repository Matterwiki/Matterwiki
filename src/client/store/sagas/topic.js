import { put, call } from "redux-saga/effects";

import {
  startLoadingTopics,
  addTopics,
  appendTopics,
  stopLoadingTopics,
  setCurrentTopic,
  emptyCurrentTopic,
  emptyTopics
} from "store/modules/topic";

import APIProvider from "utils/APIProvider";

export function* loadTopicsPage() {
  yield put(startLoadingTopics());
  const topics = yield call(APIProvider.get, "topics");
  yield put(addTopics(topics));
  yield put(stopLoadingTopics());
}

export function* disposeTopicsPage() {
  yield put(emptyTopics());
  yield put(emptyCurrentTopic());
}

export function* loadEditTopic(action) {
  yield put(emptyCurrentTopic());
  const topic = yield call(APIProvider.get, `topics/${action.id}`);
  yield put(setCurrentTopic(topic));
}

export function* disposeEditTopic() {
  yield put(emptyCurrentTopic());
}

export function* setTopic(action) {
  yield loadEditTopic(action);
}

export function* fetchTopicsByPage(action) {
  try {
    const topics = yield call(APIProvider.get, `topics?page=${action.page}`);
    yield put(appendTopics(topics));
    if (action.callback) action.callback(true);
  } catch (error) {
    if (action.callback) action.callback(false);
  }
}
