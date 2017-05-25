import React from "react";
import { hashHistory } from "react-router";

import Alert from "react-s-alert";
import APIProvider from "utils/APIProvider";

import ArticleForm from "./common/ArticleForm";

class NewArticle extends React.Component {
  constructor(...args) {
    super(...args);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(article) {
    APIProvider.post("articles", article).then(response => {
      Alert.success("Article has been successfully saved");
      hashHistory.push(`article/${response.id}`);
    });
  }

  render() {
    return <ArticleForm onSubmit={this.handleSubmit} />;
  }
}

export default NewArticle;
