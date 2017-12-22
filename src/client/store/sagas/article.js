import { put, call } from "redux-saga/effects";

import {
  startLoadingArticles,
  addArticles,
  stopLoadingArticles,
  setCurrentArticle,
  emptyCurrentArticle
} from "store/modules/article";

import APIProvider from "utils/APIProvider";

import { setTopic } from "./topic";

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
  const topic = yield call(APIProvider.get, `topics/${action.id}/articles`);
  const articles = topic.article;
  yield setTopic(action);
  yield put(addArticles(articles));
  yield put(stopLoadingArticles());
}
