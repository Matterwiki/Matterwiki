import React from "react";
import { Link } from "react-router";
import { Row, Col, Grid, HelpBlock, Button } from "react-bootstrap";
import Loader from "components/Loader/index";
import APIProvider from "utils/APIProvider.js";

import BrowseArchives from "./components/BrowseArchives";
import SimpleArticle from "../../components/SimpleArticle";

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
    APIProvider.get(
      `articles/${this.props.params.articleId}/history`
    ).then(archives => {
      this.setState({
        archives,
        loading: false
      });
    });
  }

  getArchive(id) {
    this.setState({
      archive: null,
      loading: true
    });
    APIProvider.get(`archives/${id}`).then(article => {
      this.setState({
        article,
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
            There are no archives for this article {`   `}
            <Link to={`/article/${this.props.params.articleId}`}>Go back</Link>
          </HelpBlock>
        </Row>
      );
    }
  }
}

export default ArticleHistory;
