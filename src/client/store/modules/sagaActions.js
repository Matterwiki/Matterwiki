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

export const loadHomepage = () => ({
  type: LOAD_HOMEPAGE
});

export const disposeHomepage = () => ({
  type: DISPOSE_HOMEPAGE
});

export const fetchArticlesByTopic = id => ({
  type: FETCH_ARTICLES_BY_TOPIC,
  id
});

export const loadArticlePage = id => ({
  type: LOAD_ARTICLE_PAGE,
  id
});

export const disposeArticlePage = () => ({
  type: DISPOSE_ARTICLE_PAGE
});

export const loadArchivesPage = articleId => ({
  type: LOAD_ARCHIVES_PAGE,
  articleId
});

export const disposeArchivesPage = () => ({
  type: DISPOSE_ARCHIVES_PAGE
});

export const fetchArchiveById = (articleId, archiveId) => ({
  type: FETCH_ARCHIVE_BY_ID,
  articleId,
  archiveId
});

export const loadUsersPage = () => ({
  type: LOAD_USERS_PAGE
});

export const disposeUsersPage = () => ({
  type: DISPOSE_USERS_PAGE
});

export const loadEditUser = id => ({
  type: LOAD_EDIT_USER,
  id
});

export const disposeEditUser = () => ({
  type: DISPOSE_EDIT_USER
});

export const loadTopicsPage = () => ({
  type: LOAD_TOPICS_PAGE
});

export const disposeTopicsPage = () => ({
  type: DISPOSE_TOPICS_PAGE
});

export const loadEditTopic = id => ({
  type: LOAD_EDIT_TOPIC,
  id
});

export const disposeEditTopic = () => ({
  type: DISPOSE_EDIT_TOPIC
});

export const loadArticleSearchPage = query => ({
  type: LOAD_ARTICLE_SEARCH_PAGE,
  query
});

export const disposeArticleSearchPage = () => ({
  type: DISPOSE_ARTICLE_SEARCH_PAGE
});
