import { put, call } from "redux-saga/effects";

import {
  setArticleSearchQuery,
  emptyArticleSearchQuery,
  addSearchResults,
  emptySearchResults,
  startLoadingSearchResults,
  stopLoadingSearchResults
} from "store/modules/search";

import APIProvider from "utils/APIProvider";

export function* loadArticleSearchPage(action) {
  yield put(startLoadingSearchResults());
  const { query } = action;
  yield put(setArticleSearchQuery(query));
  const results = yield call(APIProvider.query, "articles/search", { query });
  yield put(addSearchResults(results));
  yield put(stopLoadingSearchResults());
}

export function* disposeArticleSearchPage() {
  yield put(emptySearchResults());
  yield put(emptyArticleSearchQuery());
}
