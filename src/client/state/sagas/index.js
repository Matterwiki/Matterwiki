import { LOAD_HOMEPAGE, DISPOSE_HOMEPAGE } from "state/actions/types";
import { call, put, takeEvery, takeLatest } from "redux-saga/effects";

import { addArticles, emptyArticles } from "state/actions/article";

import { addTopics, emptyTopics } from "state/actions/topic";

import { startLoadingApp, stopLoadingApp } from "state/actions/app";

import APIProvider from "utils/APIProvider";

function* loadHomepage() {
  yield put(startLoadingApp());
  const topics = yield call(APIProvider.get, "topics");
  const articles = yield call(APIProvider.get, "articles");
  yield put(addTopics(topics));
  yield put(addArticles(articles));
  yield put(stopLoadingApp());
}

function* disposeHomepage() {
  yield put(emptyArticles());
  yield put(emptyTopics());
}

function* saga() {
  yield takeEvery(LOAD_HOMEPAGE, loadHomepage);
  yield takeEvery(DISPOSE_HOMEPAGE, disposeHomepage);
}

export default saga;
