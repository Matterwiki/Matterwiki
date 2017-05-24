import React from "react";
import { hashHistory } from "react-router";
import Alert from "react-s-alert";
import Loader from "Loader/index";
import ArticleForm from "./common/ArticleForm";

import API from "api/wrapper.js";

class EditArticle extends React.Component {
  constructor(...args) {
    super(...args);

    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      loading: true
    };
  }

  handleSubmit(article) {
    const articleId = this.props.params.articleId;
    const userToken = window.localStorage.getItem("userToken");

    article.id = articleId;

    API.call("articles", "PUT", userToken, article)
      .then(article => {
        Alert.success("Article has been successfully saved");
        hashHistory.push(`article/${articleId}`);
      })
      .catch(err => {
        console.log(err);
        Alert.error(response.error.message);
      });
  }

  componentDidMount() {
    this.setState({
      loading: true
    });

    const articleId = this.props.params.articleId;
    const userToken = window.localStorage.getItem("userToken");

    API.call(`articles/${articleId}`, "GET", userToken).then(response => {
      const article = response.data;
      article.what_changed = "";

      this.setState({
        article,
        loading: false
      });
    });
  }

  render() {
    const { loading, article } = this.state;

    return (
      (loading && <Loader />) ||
      <ArticleForm article={article} onSubmit={this.handleSubmit} />
    );
  }
}

export default EditArticle;
