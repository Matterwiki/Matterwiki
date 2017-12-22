import React from "react";
import Alert from "react-s-alert";
import { Grid, Row, Col } from "react-bootstrap";
import Loader from "components/Loader/Loader";
import APIProvider from "utils/APIProvider";

import { connect } from "react-redux";

import { loadArticlePage, disposeArticlePage } from "store/modules/sagaActions";

import ViewArticle from "./ViewArticle";

class ViewArticleContainer extends React.Component {
  componentDidMount() {
    const id = this.props.match.params.articleId;
    this.props.loadArticlePage(id);
  }

  componentWillUnmount() {
    this.props.disposeArticlePage();
  }

  handleEditClick = e => {
    e.preventDefault();
    const id = this.props.article.id;
    this.props.history.push(`/article/edit/${id}`);
  };

  handleHistoryClick = e => {
    e.preventDefault();
    const id = this.props.article.id;
    this.props.history.push(`/article/${id}/history`);
  };

  handleDeleteClick = e => {
    e.preventDefault();
    const id = this.props.article.id;
    APIProvider.delete(`articles/${id}`).then(() => {
      Alert.success("Article has been deleted");
      this.props.history.push("/home");
    });
  };

  render() {
    const { article, loading } = this.props;
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

const mapDispatchToProps = dispatch => ({
  loadArticlePage: id => dispatch(loadArticlePage(id)),
  disposeArticlePage: () => dispatch(disposeArticlePage())
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewArticleContainer);
