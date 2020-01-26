import React from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Heading, HelpBlock, Loader } from 'ui'
import { connect } from 'react-redux'

import {
  loadArchivesPage,
  disposeArchivesPage,
  fetchArchiveById,
  fetchArchivesByPage
} from 'store/modules/sagaActions'

import BrowseArchives from './components/BrowseArchives'
import SimpleArticle from '../../components/SimpleArticle'

class ArticleHistory extends React.Component {
  state = {
    appendingArchives: false
  };

  componentDidMount () {
    const { articleId } = this.props.match.params
    this.props.loadArchivesPage(articleId)
  }

  componentWillUnmount () {
    this.props.disposeArchivesPage()
  }

  handleArchiveChosen = archiveId => {
    const { articleId } = this.props.match.params
    this.props.fetchArchiveById(articleId, archiveId)
  };

  handleLoadMore = e => {
    e.preventDefault()
    this.setState({ appendingArchives: true })
    const { articleId } = this.props.match.params
    const { pageNumber } = this.props.archivesMeta
    this.props.fetchArchivesByPage(articleId, pageNumber + 1, () => {
      this.setState({ appendingArchives: false })
    })
  };

  render () {
    const { appendingArchives } = this.state
    const { archives, currentArchive, loadingCurrentArchive, loading, archivesMeta } = this.props
    if (loading) return <Loader />
    else if (archives && archives.length) {
      return (
        <Row>
          <Col widthMedium='25'>
            <Heading size='1' transform='uppercase'>
              Archives
            </Heading>
            <BrowseArchives
              archives={archives}
              onArchiveChosen={this.handleArchiveChosen}
              articleId={this.props.match.params.articleId}
              currentArchive={currentArchive}
              archivesMeta={archivesMeta}
              onLoadMoreClick={this.handleLoadMore}
              appendingArchives={appendingArchives}
            />
          </Col>
          <Col>
            <SimpleArticle article={currentArchive} loading={loadingCurrentArchive} />
          </Col>
        </Row>
      )
    }
    return (
      <Row>
        <HelpBlock textAlign='center'>
          There are no archives for this article {'   '}
          <Link to={`/article/${this.props.match.params.articleId}`}>Go back</Link>
        </HelpBlock>
      </Row>
    )
  }
}

const mapStateToProps = state => ({
  currentArchive: state.archives.currentArchive,
  archives: state.archives.archives.all,
  archivesMeta: state.archives.archives.meta,
  loading: state.app.loading,
  loadingCurrentArchive: state.archives.loading
})

const mapDispatchToProps = dispatch => ({
  loadArchivesPage: articleId => dispatch(loadArchivesPage(articleId)),
  disposeArchivesPage: () => dispatch(disposeArchivesPage()),
  fetchArchiveById: (articleId, archiveId) => dispatch(fetchArchiveById(articleId, archiveId)),
  fetchArchivesByPage: (articleId, page, callback) =>
    dispatch(fetchArchivesByPage(articleId, page, callback))
})

export default connect(mapStateToProps, mapDispatchToProps)(ArticleHistory)
