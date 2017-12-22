import {
  LOAD_HOMEPAGE,
  DISPOSE_HOMEPAGE,
  FETCH_ARTICLES_BY_TOPIC,
  LOAD_ARTICLE_PAGE,
  DISPOSE_ARTICLE_PAGE,
  LOAD_ARCHIVES_PAGE,
  DISPOSE_ARCHIVES_PAGE,
  FETCH_ARCHIVE_BY_ID,
  LOAD_USERS_PAGE,
  DISPOSE_USERS_PAGE,
  LOAD_EDIT_USER,
  DISPOSE_EDIT_USER,
  LOAD_TOPICS_PAGE,
  DISPOSE_TOPICS_PAGE,
  LOAD_EDIT_TOPIC,
  DISPOSE_EDIT_TOPIC,
  LOAD_ARTICLE_SEARCH_PAGE,
  DISPOSE_ARTICLE_SEARCH_PAGE
} from "store/actionTypes";
import { takeEvery } from "redux-saga/effects";

import { loadArticlePage, disposeArticlePage, fetchArticlesByTopic } from "./article";

import { loadArchivesPage, disposeArchivesPage, fetchArchiveById } from "./archive";

import { loadUsersPage, disposeUsersPage, loadEditUser, disposeEditUser } from "./user";

import { loadTopicsPage, disposeTopicsPage, loadEditTopic, disposeEditTopic } from "./topic";

import { loadHomepage, disposeHomepage } from "./app";

import { loadArticleSearchPage, disposeArticleSearchPage } from "./search";

function* saga() {
  yield takeEvery(LOAD_HOMEPAGE, loadHomepage);
  yield takeEvery(DISPOSE_HOMEPAGE, disposeHomepage);
  yield takeEvery(FETCH_ARTICLES_BY_TOPIC, fetchArticlesByTopic);
  yield takeEvery(LOAD_ARTICLE_PAGE, loadArticlePage);
  yield takeEvery(DISPOSE_ARTICLE_PAGE, disposeArticlePage);
  yield takeEvery(LOAD_ARCHIVES_PAGE, loadArchivesPage);
  yield takeEvery(DISPOSE_ARCHIVES_PAGE, disposeArchivesPage);
  yield takeEvery(FETCH_ARCHIVE_BY_ID, fetchArchiveById);
  yield takeEvery(LOAD_USERS_PAGE, loadUsersPage);
  yield takeEvery(DISPOSE_USERS_PAGE, disposeUsersPage);
  yield takeEvery(LOAD_EDIT_USER, loadEditUser);
  yield takeEvery(DISPOSE_EDIT_USER, disposeEditUser);
  yield takeEvery(LOAD_TOPICS_PAGE, loadTopicsPage);
  yield takeEvery(DISPOSE_TOPICS_PAGE, disposeTopicsPage);
  yield takeEvery(LOAD_EDIT_TOPIC, loadEditTopic);
  yield takeEvery(DISPOSE_EDIT_TOPIC, disposeEditTopic);
  yield takeEvery(LOAD_ARTICLE_SEARCH_PAGE, loadArticleSearchPage);
  yield takeEvery(DISPOSE_ARTICLE_SEARCH_PAGE, disposeArticleSearchPage);
}

export default saga;
