import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Grid, HelpBlock, Button } from "react-bootstrap";
import Loader from "components/Loader/Loader";
import APIProvider from "utils/APIProvider.js";

import BrowseArchives from "./components/BrowseArchives";
import SimpleArticle from "../../components/SimpleArticle";

import "./Archives.css";

class ArticleHistory extends React.Component {
  state = {
    archives: [],
    article: {}
  };

  componentDidMount() {
    this.setState({
      loading: true
    });

    const {articleId} = this.props.match.params;
    APIProvider.get(
      `articles/${articleId}/archives`
    ).then(archives => {
      this.setState({
        archives,
        loading: false
      });
    });
  }

  getArchive = id => {
    this.setState({
      archive: null,
      loading: true
    });
    const { articleId } = this.props.match.params;
    APIProvider.get(`articles/${articleId}/archives/${id}`).then(article => {
      this.setState({
        article,
        loading: false
      });
    });
  };

  render() {

    const {loading, article, archives} = this.state;

    if (loading) return <Loader />;
    else if (article && archives.length) {
      return (
        <Grid>
          <Row>
            <Col md={3}>
              <label>Archives</label>
              <BrowseArchives
                archives={archives}
                onArchiveChosen={this.getArchive}
                articleId={this.props.match.params.articleId}
              />
            </Col>
            <Col md={9}>
              <SimpleArticle article={article} />
            </Col>
          </Row>
        </Grid>
      );
    } else {
      return (
        <Row>
          <HelpBlock className="center-align">
            There are no archives for this article {`   `}
            <Link to={`/article/${this.props.match.params.articleId}`}>Go back</Link>
          </HelpBlock>
        </Row>
      );
    }
  }
}

export default ArticleHistory;
