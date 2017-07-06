import React from "react";
import Alert from "react-s-alert";
import Loader from "components/Loader/Loader";
import ArticleForm from "../components/ArticleForm/ArticleForm";

import APIProvider from "utils/APIProvider";

class EditArticle extends React.Component {
  state = {
    loading: true
  };

  handleSubmit = article => {
    const articleId = this.props.match.params.articleId;

    article.id = articleId;

    APIProvider.put("articles", article)
      .then(article => {
        Alert.success("Article has been successfully saved");
        this.props.history.push(`/article/${articleId}`);
      })
      .catch(err => {
        Alert.error(response.error.message);
      });
  };

  componentDidMount() {
    this.setState({
      loading: true
    });

    const articleId = this.props.match.params.articleId;

    APIProvider.get(`articles/${articleId}`).then(article => {
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
