import {
  LOAD_HOMEPAGE,
  DISPOSE_HOMEPAGE,
  FETCH_ARTICLES_BY_TOPIC,
  LOAD_ARTICLE_PAGE,
  DISPOSE_ARTICLE_PAGE,
  LOAD_ARCHIVES_PAGE,
  DISPOSE_ARCHIVES_PAGE,
  FETCH_ARCHIVE_BY_ID
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

import {
  addArchives,
  startLoadingArchives,
  stopLoadingArchives,
  emptyArchives,
  emptyCurrentArchive,
  setCurrentArchive
} from "state/actions/archive";

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

function* loadArchivesPage(action) {
  yield put(startLoadingApp());
  const archives = yield call(
    APIProvider.get,
    `articles/${action.articleId}/history`
  );
  yield put(addArchives(archives));
  yield put(stopLoadingApp());
}

function* disposeArchivesPage() {
  yield put(emptyArchives());
  yield put(emptyCurrentArchive());
}

function* fetchArchiveById(action) {
  yield put(startLoadingArchives());
  const archive = yield call(
    APIProvider.get,
    `articles/${action.articleId}/history/${action.archiveId}`
  );
  yield put(setCurrentArchive(archive));
  yield put(stopLoadingArchives());
}

function* saga() {
  yield takeEvery(LOAD_HOMEPAGE, loadHomepage);
  yield takeEvery(DISPOSE_HOMEPAGE, disposeHomepage);
  yield takeEvery(FETCH_ARTICLES_BY_TOPIC, fetchArticlesByTopic);
  yield takeEvery(LOAD_ARTICLE_PAGE, loadArticlePage);
  yield takeEvery(DISPOSE_ARTICLE_PAGE, disposeArticlePage);
  yield takeEvery(LOAD_ARCHIVES_PAGE, loadArchivesPage);
  yield takeEvery(DISPOSE_ARCHIVES_PAGE, disposeArchivesPage);
  yield takeEvery(FETCH_ARCHIVE_BY_ID, fetchArchiveById);
}

export default saga;
