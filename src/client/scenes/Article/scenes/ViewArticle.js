import React from "react";
import Alert from "react-s-alert";
import { Grid, Row, Col } from "react-bootstrap";
import Loader from "components/Loader/Loader";
import APIProvider from "utils/APIProvider";

import ArticleHeading from "../components/ArticleHeading";
import WikiEditor from "../components/WikiEditor/WikiEditor";
import ArticleSidebar from "../components/ArticleSidebar";

class ViewArticle extends React.Component {
  state = {
    loading: true,
    article: {}
  };

  componentDidMount() {
    const id = this.props.match.params.articleId;

    APIProvider.get(`articles/${id}`).then(article => {
      this.setState({
        article,
        loading: false
      });
    });
  }

  handleEditClick = () => {
    this.props.history.push(`/article/edit/${this.state.article.id}`);
  };

  handleHistoryClick = () => {
    this.props.history.push(`/article/history/${this.state.article.id}`);
  };

  handleDeleteClick = e => {
    e.preventDefault();
    APIProvider.delete(`articles/${this.state.article.id}`).then(() => {
      Alert.success("Article has been deleted");
      this.props.history.push("/home");
    });
  };

  render() {
    const { loading, article } = this.state;
    const isAdmin = parseInt(window.localStorage.getItem("userId"), 10) === 1;

    if (loading) {
      return <Loader />;
    } else if (article) {
      return (
        <Grid fluid>
          <Row>
            <Col md={9}>
              <ArticleHeading date={article.updated_at}>
                {article.title}
              </ArticleHeading>
              <div className="single-article-body">
                <WikiEditor readOnly rawContent={JSON.parse(article.body)} />
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
