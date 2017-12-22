import { put, call } from "redux-saga/effects";

import {
  startLoadingArticles,
  addArticles,
  stopLoadingArticles,
  setCurrentArticle,
  emptyCurrentArticle
} from "store/modules/article";

import APIProvider from "utils/APIProvider";

export function* loadArticlePage(action) {
  yield put(startLoadingArticles());
  const article = yield call(APIProvider.get, `articles/${action.id}`);
  yield put(setCurrentArticle(article));
  yield put(stopLoadingArticles());
}

export function* disposeArticlePage() {
  yield put(emptyCurrentArticle());
}

export function* fetchArticlesByTopic(action) {
  yield put(startLoadingArticles());
  const articles = yield call(APIProvider.get, `articles?topic_id=${action.id}`);
  yield put(addArticles(articles));
  yield put(stopLoadingArticles());
}
