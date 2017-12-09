import React from "react";
import Alert from "react-s-alert";
import { Grid, Row, Col } from "react-bootstrap";
import Loader from "components/Loader/Loader";
import APIProvider from "utils/APIProvider";

import { connect } from "react-redux";

import store from "state/store";
import { loadArticlePage, disposeArticlePage } from "state/actions/sagaActions";

import ViewArticle from "./ViewArticle";

class ViewArticleContainer extends React.Component {
  componentDidMount() {
    const id = this.props.match.params.articleId;
    store.dispatch(loadArticlePage(id));
  }

  componentWillUnmount() {
    store.dispatch(disposeArticlePage());
  }

  handleEditClick = () => {
    this.props.history.push(`/article/edit/${this.state.article.id}`);
  };

  handleHistoryClick = () => {
    this.props.history.push(`/article/${this.state.article.id}/history`);
  };

  handleDeleteClick = e => {
    e.preventDefault();
    APIProvider.delete(`articles/${this.state.article.id}`).then(() => {
      Alert.success("Article has been deleted");
      this.props.history.push("/home");
    });
  };

  render() {
    const { articles: { loading, currentArticle: article } } = store.getState();
    if (loading) {
      return <Loader />;
    } else if (article.title) {
      return (
        <ViewArticle
          article={article}
          loading={loading}
          handleEditClick={this.handleEditClick}
          handleDeleteClick={this.handleDeleteClick}
          handleHistoryClick={this.handleHistoryClick}
        />
      );
    }
    return <div />;
  }
}

const mapStateToProps = state => ({
  article: state.articles.currentArticle,
  loading: state.articles.loading
});

export default connect(mapStateToProps)(ViewArticleContainer);
