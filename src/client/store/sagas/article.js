import { put, call } from 'redux-saga/effects'

import {
  startLoadingArticles,
  addArticles,
  appendArticles,
  stopLoadingArticles,
  setCurrentArticle,
  emptyCurrentArticle
} from 'store/modules/article'

import APIProvider from 'utils/APIProvider'

import { setTopic } from './topic'

export function * loadArticlePage (action) {
  yield put(startLoadingArticles())
  const article = yield call(APIProvider.get, `articles/${action.id}`)
  yield put(setCurrentArticle(article))
  yield put(stopLoadingArticles())
}

export function * disposeArticlePage () {
  yield put(emptyCurrentArticle())
}

export function * fetchArticlesByTopic (action) {
  yield put(startLoadingArticles())
  const articles = yield call(APIProvider.get, `articles?topic_id=${action.id}`)
  yield setTopic(action)
  yield put(addArticles(articles))
  yield put(stopLoadingArticles())
}

export function * fetchArticlesByPage (action) {
  try {
    const articles = yield call(APIProvider.get, `articles?page=${action.page}`)
    yield put(appendArticles(articles))
    if (action.callback) action.callback(true)
  } catch (error) {
    if (action.callback) action.callback(false)
  }
}
