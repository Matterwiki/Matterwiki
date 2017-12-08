import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Grid, HelpBlock } from "react-bootstrap";
import Loader from "components/Loader/Loader";
import APIProvider from "utils/APIProvider";
import { connect } from "react-redux";
import {
  addArchives,
  emptyArchives,
  startLoading,
  stopLoading,
  setCurrentArchive,
  emptyCurrentArchive
} from "state/actions/archive";
import store from "state/store";

import BrowseArchives from "./components/BrowseArchives";
import SimpleArticle from "../../components/SimpleArticle";

import "./Archives.css";

class ArticleHistory extends React.Component {
  state = {
    loadingCurrentArchive: false
  };

  componentDidMount() {
    const { articleId } = this.props.match.params;
    store.dispatch(startLoading());
    APIProvider.get(`articles/${articleId}/history`)
      .then(archives => {
        store.dispatch(addArchives(archives));
        store.dispatch(stopLoading());
      })
      .catch(() => {
        store.dispatch(emptyArchives());
        store.dispatch(stopLoading());
      });
  }

  componentWillUnmount() {
    store.dispatch(emptyArchives());
    store.dispatch(emptyCurrentArchive());
  }

  getArchive = archiveId => {
    this.setState({
      loadingCurrentArchive: true
    });
    store.dispatch(emptyCurrentArchive());
    const { articleId } = this.props.match.params;
    APIProvider.get(`articles/${articleId}/history/${archiveId}`)
      .then(article => {
        store.dispatch(setCurrentArchive(article));
        this.setState({
          loadingCurrentArchive: false
        });
      })
      .catch(() => this.setState({ loadingCurrentArchive: false }));
  };

  render() {
    const {
      archives: { loading, archives, currentArchive }
    } = store.getState();
    const { loadingCurrentArchive } = this.state;
    if (loading) return <Loader />;
    else if (archives && archives.length) {
      return (
        <Grid>
          <Row>
            <Col md={3}>
              <span>Archives</span>
              <BrowseArchives
                archives={archives}
                onArchiveChosen={this.getArchive}
                articleId={this.props.match.params.articleId}
              />
            </Col>
            <Col md={9}>
              <SimpleArticle
                article={currentArchive}
                loading={loadingCurrentArchive}
              />
            </Col>
          </Row>
        </Grid>
      );
    }
    return (
      <Row>
        <HelpBlock className="center-align">
          There are no archives for this article {`   `}
          <Link to={`/article/${this.props.match.params.articleId}`}>
            Go back
          </Link>
        </HelpBlock>
      </Row>
    );
  }
}

const mapStateToProps = state => ({
  currentArchive: state.archives.currentArchive,
  archives: state.archives.archives,
  loading: state.archives.loading
});

export default connect(mapStateToProps)(ArticleHistory);
