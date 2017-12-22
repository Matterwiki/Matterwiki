import React from "react";
import Alert from "react-s-alert";
import Loader from "components/Loader/Loader";
import APIProvider from "utils/APIProvider";

import ArticleForm from "../components/ArticleForm/ArticleForm";

class EditArticle extends React.Component {
  state = {
    loading: true
  };

  componentDidMount() {
    const { articleId } = this.props.match.params;

    APIProvider.get(`articles/${articleId}`).then(article => {
      this.setState({
        article: { ...article, change_log: "" },
        loading: false
      });
    });
  }

  handleSubmit = article => {
    const articleId = this.props.match.params.articleId;

    APIProvider.put(`articles/${articleId}`, article)
      .then(() => {
        Alert.success("Article has been successfully saved");
        this.props.history.push(`/article/${articleId}`);
      })
      .catch(err => {
        Alert.error(err.message);
      });
  };

  render() {
    const { loading, article } = this.state;

    return (
      (loading && <Loader />) || <ArticleForm article={article} onSubmit={this.handleSubmit} />
    );
  }
}

export default EditArticle;
