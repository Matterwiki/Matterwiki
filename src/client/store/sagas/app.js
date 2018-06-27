import { put, call } from "redux-saga/effects";

import { addArticles, emptyArticles } from "store/modules/article";

import { addTopics, emptyTopics, setCurrentTopic, emptyCurrentTopic } from "store/modules/topic";

import { startLoadingApp, stopLoadingApp, setUser, unsetUser } from "store/modules/app";

import APIProvider, { setTokenHeader } from "utils/APIProvider";

export function* loadHomepage() {
  yield put(startLoadingApp());
  const topics = yield call(APIProvider.get, "topics");
  const articles = yield call(APIProvider.get, `articles?topic_id=${topics.topics[0].id}`);
  yield put(setCurrentTopic(topics.topics[0]));
  yield put(addTopics(topics));
  yield put(addArticles(articles));
  yield put(stopLoadingApp());
}

export function* disposeHomepage() {
  yield put(emptyArticles());
  yield put(emptyTopics());
  yield put(emptyCurrentTopic());
}

export function* loginUser(action) {
  try {
    const loggedInUser = yield call(APIProvider.post, "auth/login", action.user);
    window.localStorage.setItem("userToken", loggedInUser.token);
    window.localStorage.setItem("userId", loggedInUser.id);
    window.localStorage.setItem("userEmail", loggedInUser.email);
    setTokenHeader(loggedInUser.token);
    yield put(setUser(loggedInUser));
    if (action.callback) action.callback(false);
  } catch (e) {
    if (action.callback) action.callback(e);
  }
}

export function oAuthLogin(action) {
  window.localStorage.setItem("userToken", action.token);
  setTokenHeader(action.token);
  if (action.callback) action.callback(false);
}

export function* logoutUser(action) {
  yield put(unsetUser());
  setTokenHeader("");
  window.localStorage.setItem("userToken", "");
  if (action.callback) action.callback(false);
}
