import { put, call } from "redux-saga/effects";

import { addArticles, emptyArticles } from "store/modules/article";

import { addTopics, emptyTopics, setCurrentTopic, emptyCurrentTopic } from "store/modules/topic";

import { startLoadingApp, stopLoadingApp } from "store/modules/app";

import APIProvider from "utils/APIProvider";

export function* loadHomepage() {
  yield put(startLoadingApp());
  const topics = yield call(APIProvider.get, "topics");
  const articles = yield call(APIProvider.get, `articles?topic_id=${topics[0].id}`);
  yield put(setCurrentTopic(topics[0]));
  yield put(addTopics(topics));
  yield put(addArticles(articles));
  yield put(stopLoadingApp());
}

export function* disposeHomepage() {
  yield put(emptyArticles());
  yield put(emptyTopics());
  yield put(emptyCurrentTopic());
}
