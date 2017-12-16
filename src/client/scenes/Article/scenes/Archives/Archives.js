import React from "react";
import { Link } from "react-router-dom";
import { HelpBlock } from "react-bootstrap";
import { Row, Col, Heading } from "ui";
import Loader from "components/Loader/Loader";
import { connect } from "react-redux";

import store from "state/store";
import {
  loadArchivesPage,
  disposeArchivesPage,
  fetchArchiveById
} from "state/actions/sagaActions";

import BrowseArchives from "./components/BrowseArchives";
import SimpleArticle from "../../components/SimpleArticle";

class ArticleHistory extends React.Component {
  componentDidMount() {
    const { articleId } = this.props.match.params;
    store.dispatch(loadArchivesPage(articleId));
  }

  componentWillUnmount() {
    store.dispatch(disposeArchivesPage());
  }

  getArchive = archiveId => {
    const { articleId } = this.props.match.params;
    store.dispatch(fetchArchiveById(articleId, archiveId));
  };

  render() {
    const {
      archives: { archives, currentArchive, loading: loadingCurrentArchive },
      app: { loading }
    } = store.getState();
    if (loading) return <Loader />;
    else if (archives && archives.length) {
      return (
        <Row>
          <Col width="25">
            <Heading size="1" transform="uppercase">
              Archives
            </Heading>
            <BrowseArchives
              archives={archives}
              onArchiveChosen={this.getArchive}
              articleId={this.props.match.params.articleId}
              currentArchive={currentArchive}
            />
          </Col>
          <Col>
            <SimpleArticle
              article={currentArchive}
              loading={loadingCurrentArchive}
            />
          </Col>
        </Row>
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
  loading: state.app.loading,
  loadingCurrentArchive: state.archives.loading
});

export default connect(mapStateToProps)(ArticleHistory);
