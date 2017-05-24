import React from "react";
import { hashHistory } from "react-router";

import Alert from "react-s-alert";
import API from "api/wrapper.js";

import ArticleForm from "./common/ArticleForm";

const NewArticle = props => {
  const handleSubmit = article => {
    API.call(
      "articles",
      "POST",
      window.localStorage.getItem("userToken"),
      article
    ).then(response => {
      Alert.success("Article has been successfully saved");
      hashHistory.push(`article/${response.data.id}`);
    });
  };

  return <ArticleForm onSubmit={handleSubmit} />;
};

export default NewArticle;
