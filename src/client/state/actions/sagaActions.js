/* eslint-disable */
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
  DISPOSE_EDIT_USER
} from "./types";

export const loadHomepage = () => {
  return {
    type: LOAD_HOMEPAGE
  };
};

export const disposeHomepage = () => {
  return {
    type: DISPOSE_HOMEPAGE
  };
};

export const fetchArticlesByTopic = id => {
  return {
    type: FETCH_ARTICLES_BY_TOPIC,
    id
  };
};

export const loadArticlePage = id => {
  return {
    type: LOAD_ARTICLE_PAGE,
    id
  };
};

export const disposeArticlePage = () => {
  return {
    type: DISPOSE_ARTICLE_PAGE
  };
};

export const loadArchivesPage = articleId => {
  return {
    type: LOAD_ARCHIVES_PAGE,
    articleId
  };
};

export const disposeArchivesPage = () => {
  return {
    type: DISPOSE_ARCHIVES_PAGE
  };
};

export const fetchArchiveById = (articleId, archiveId) => {
  return {
    type: FETCH_ARCHIVE_BY_ID,
    articleId,
    archiveId
  };
};

export const loadUsersPage = () => {
  return {
    type: LOAD_USERS_PAGE
  };
};

export const disposeUsersPage = () => {
  return {
    type: DISPOSE_USERS_PAGE
  };
};

export const loadEditUser = id => {
  return {
    type: LOAD_EDIT_USER,
    id
  };
};

export const disposeEditUser = () => {
  return {
    type: DISPOSE_EDIT_USER
  };
};
