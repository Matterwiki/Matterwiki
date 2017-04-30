import React from "react";
import { browserHistory, hashHistory } from "react-router";
import Loader from "Loader/index";
import Alert from "react-s-alert";
import API from "api/wrapper.js";

import { Row, Col } from "react-bootstrap";

import ArticleHeading from "./ArticleHeading";
import WikiEditor from "../WikiEditor/index.jsx";
import ArticleSidebar from "./ArticleSidebar";
import ArticleModal from "./ArticleModal";

class ViewArticle extends React.Component {
  constructor(props) {
    super(props);

    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleHistoryClick = this.handleHistoryClick.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);

    this.state = {
      loading: true,
      article: {},
      isHtml: null
    };
  }

  componentDidMount() {
    var id = this.props.params.articleId;
    API.call(
      `articles/${id}`,
      "GET",
      window.localStorage.getItem("userToken")
    ).then(article => {
      this.setState({
        article: article.data,
        isHtml: article.data.body && !response.data.body_json ? true : false,
        loading: false
      });
    });
  }

  handleEditClick(e) {
    hashHistory.push(`article/edit/${this.state.article.id}`);
  }

  handleHistoryClick(e) {
    hashHistory.push(`article/history/${this.state.article.id}`);
  }

  handleDeleteClick(e) {
    e.preventDefault();
    API.call(
      `articles?id=${this.state.article.id}`,
      "DELETE",
      window.localStorage.getItem("userToken")
    ).then(article => {
      Alert.success("Article has been deleted");
      hashHistory.push("home");
    });
  }

  render() {
    const { loading, article, isHtml } = this.state;
    const isAdmin = parseInt(window.localStorage.getItem("userId")) === 1;

    if (loading) return <Loader />;
    else if (article) {
      return (
        <div>
          <Row>
            <Col md={9}>
              <ArticleHeading date={article.updated_at}>
                {decodeURIComponent(article.title)}
              </ArticleHeading>
              <div className="single-article-body">
                <WikiEditor
                  readOnly={true}
                  rawContent={JSON.parse(decodeURIComponent(article.body_json))}
                  isHtml={isHtml}
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
        </div>
      );
    }
  }
}

export default ViewArticle;
