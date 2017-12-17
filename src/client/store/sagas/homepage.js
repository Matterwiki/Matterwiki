/* eslint-disable */
import { addArticles, emptyArticles } from "store/modules/article";

import { addTopics, emptyTopics } from "store/modules/topic";

import APIProvider from "utils/APIProvider";

export function* loadHomepage() {
  const topics = yield call(APIProvider.get, "topics");
  const articles = yield call(APIProvider.get, "articles");
  yield put(addTopics(topics));
  yield put(addArticles(articles));
}
