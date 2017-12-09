/* eslint-disable */
import { addArticles, emptyArticles } from "state/actions/article";

import { addTopics, emptyTopics } from "state/actions/topic";

import APIProvider from "utils/APIProvider";

export function* loadHomepage() {
  const topics = yield call(APIProvider.get, "topics");
  const articles = yield call(APIProvider.get, "articles");
  yield put(addTopics(topics));
  yield put(addArticles(articles));
}
