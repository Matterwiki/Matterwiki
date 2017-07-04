import React from "react";
import { browserHistory, hashHistory } from "react-router";
import Alert from "react-s-alert";
import { Grid, Row, Col } from "react-bootstrap";

import ArticleHeading from "../components/ArticleHeading";
import WikiEditor from "../components/WikiEditor/index";
import ArticleSidebar from "../components/ArticleSidebar";

import Loader from "components/Loader/index";
import APIProvider from "utils/APIProvider";

class ViewArticle extends React.Component {
  state = {
    loading: true,
    article: {}
  };

  componentDidMount() {
    var id = this.props.params.articleId;
    APIProvider.get(`articles/${id}`).then(article => {
      this.setState({
        article,
        loading: false
      });
    });
  }

  handleEditClick = e => {
    hashHistory.push(`article/edit/${this.state.article.id}`);
  };

  handleHistoryClick = e => {
    hashHistory.push(`article/history/${this.state.article.id}`);
  };

  handleDeleteClick = e => {
    e.preventDefault();
    APIProvider.delete(`articles/${this.state.article.id}`).then(article => {
      Alert.success("Article has been deleted");
      hashHistory.push("home");
    });
  };

  render() {
    const { loading, article } = this.state;
    const isAdmin = parseInt(window.localStorage.getItem("userId")) === 1;

    if (loading) return <Loader />;
    else if (article) {
      return (
        <Grid fluid={true}>
          <Row>
            <Col md={9}>
              <ArticleHeading date={article.updated_at}>
                {article.title}
              </ArticleHeading>
              <div className="single-article-body">
                <WikiEditor
                  readOnly={true}
                  rawContent={JSON.parse(article.body)}
                />
              </div>
            </Col>
            <Col md={3}>
              <ArticleSidebar
                article={article}
                onEditClick={this.handleEditClick}
                onDeleteClick={this.handleDeleteClick}
                onHistoryClick={this.handleHistoryClick}
                isAdmin={isAdmin}
              />
            </Col>
          </Row>
        </Grid>
      );
    }
  }
}

export default ViewArticle;
