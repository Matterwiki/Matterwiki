import {
  LOAD_HOMEPAGE,
  DISPOSE_HOMEPAGE,
  FETCH_ARTICLES_BY_TOPIC,
  LOAD_ARTICLE_PAGE,
  DISPOSE_ARTICLE_PAGE
} from "state/actions/types";
import { call, put, takeEvery, takeLatest } from "redux-saga/effects";

import {
  addArticles,
  emptyArticles,
  startLoadingArticles,
  stopLoadingArticles,
  setCurrentArticle,
  emptyCurrentArticle
} from "state/actions/article";

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

function* fetchArticlesByTopic(action) {
  yield put(startLoadingArticles());
  const topic = yield call(APIProvider.get, `topics/${action.id}/articles`);
  const articles = topic.article;
  yield put(addArticles(articles));
  yield put(stopLoadingArticles());
}

function* loadArticlePage(action) {
  yield put(startLoadingArticles());
  const article = yield call(APIProvider.get, `articles/${action.id}`);
  yield put(setCurrentArticle(article));
  yield put(stopLoadingArticles());
}

function* disposeArticlePage() {
  yield put(emptyCurrentArticle());
}

function* saga() {
  yield takeEvery(LOAD_HOMEPAGE, loadHomepage);
  yield takeEvery(DISPOSE_HOMEPAGE, disposeHomepage);
  yield takeEvery(FETCH_ARTICLES_BY_TOPIC, fetchArticlesByTopic);
  yield takeEvery(LOAD_ARTICLE_PAGE, loadArticlePage);
  yield takeEvery(DISPOSE_ARTICLE_PAGE, disposeArticlePage);
}

export default saga;
