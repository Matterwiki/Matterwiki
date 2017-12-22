import { put, call } from "redux-saga/effects";

import { startLoadingApp, stopLoadingApp } from "store/modules/app";

import {
  startLoadingArchives,
  addArchives,
  stopLoadingArchives,
  setCurrentArchive,
  emptyCurrentArchive,
  emptyArchives
} from "store/modules/archive";

import APIProvider from "utils/APIProvider";

export function* loadArchivesPage(action) {
  yield put(startLoadingApp());
  const archives = yield call(APIProvider.get, `articles/${action.articleId}/history`);
  yield put(addArchives(archives));
  yield put(stopLoadingApp());
}

export function* disposeArchivesPage() {
  yield put(emptyArchives());
  yield put(emptyCurrentArchive());
}

export function* fetchArchiveById(action) {
  yield put(startLoadingArchives());
  const archive = yield call(
    APIProvider.get,
    `articles/${action.articleId}/history/${action.archiveId}`
  );
  yield put(setCurrentArchive(archive));
  yield put(stopLoadingArchives());
}
