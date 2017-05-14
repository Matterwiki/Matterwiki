import React from "react";
import { Link } from "react-router";
import { Row, Col, Grid, HelpBlock, Button } from "react-bootstrap";
import Loader from "Loader/index";
import BrowseArchives from "./BrowseArchives";
import { SimpleArticle } from "../Article/index";
import API from "api/wrapper.js";

import "./Archives.css";

class ArticleHistory extends React.Component {
  constructor(...args) {
    super(...args);
    this.getArchive = this.getArchive.bind(this);
    this.state = {
      archives: [],
      article: {}
    };
  }

  componentDidMount() {
    this.setState({
      loading: true
    });
    API.call(
      `articles/${this.props.params.articleId}/history`,
      "GET",
      window.localStorage.getItem("userToken")
    ).then(articles => {
      this.setState({
        archives: articles.data,
        loading: false
      });
    });
  }

  getArchive(id) {
    this.setState({
      loading: true
    });
    API.call(
      `archives/${id}`,
      "GET",
      window.localStorage.getItem("userToken")
    ).then(archive => {
      this.setState({
        article: archive.data,
        loading: false
      });
    });
  }

  render() {
    if (this.state.loading) return <Loader />;
    else if (this.state.article && this.state.archives.length) {
      return (
        <Grid>
          <Row>
            <Col md={3}>
              <label>Archives</label>
              <BrowseArchives
                archives={this.state.archives}
                onArchiveChosen={this.getArchive}
                articleId={this.props.params.articleId}
              />
            </Col>
            <Col md={9}>
              <SimpleArticle article={this.state.article} />
            </Col>
          </Row>
        </Grid>
      );
    } else {
      return (
        <Row>
          <HelpBlock className="center-align">
            There are no archives for this article &nbsp;&nbsp;&nbsp;
            <Link to={`/article/${this.props.params.articleId}`}>Go back</Link>
          </HelpBlock>
        </Row>
      );
    }
  }
}

export default ArticleHistory;
