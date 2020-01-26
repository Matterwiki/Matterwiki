import React from 'react'
import Alert from 'react-s-alert'
import { Modal } from 'ui'
import Loader from 'ui/loader'
import APIProvider from 'utils/APIProvider'

import { connect } from 'react-redux'

import { loadArticlePage, disposeArticlePage } from 'store/modules/sagaActions'

import ViewArticle from './ViewArticle'

class ViewArticleContainer extends React.Component {
  state = {
    showDeleteModal: false
  };

  componentDidMount () {
    const id = this.props.match.params.articleId
    this.props.loadArticlePage(id)
  }

  componentWillUnmount () {
    this.props.disposeArticlePage()
  }

  handleEditClick = e => {
    e.preventDefault()
    const id = this.props.article.id
    this.props.history.push(`/article/edit/${id}`)
  };

  handleHistoryClick = e => {
    e.preventDefault()
    const id = this.props.article.id
    this.props.history.push(`/article/${id}/history`)
  };

  handleDeleteClick = e => {
    e.preventDefault()
    this.setState({ showDeleteModal: true })
  };

  confirmDelete = () => {
    const id = this.props.article.id
    APIProvider.delete(`articles/${id}`).then(() => {
      Alert.success('Article has been deleted')
      this.props.history.push('/home')
    })
  };

  closeDeleteModal = () => {
    this.setState({ showDeleteModal: false })
  };

  render () {
    const { article, loading } = this.props
    const { showDeleteModal } = this.state
    if (loading) {
      return <Loader />
    } else if (article.title) {
      return (
        <>
          <ViewArticle
            article={article}
            loading={loading}
            onEditClick={this.handleEditClick}
            onDeleteClick={this.handleDeleteClick}
            onHistoryClick={this.handleHistoryClick}
          />
          <Modal
            visible={showDeleteModal}
            title='Are you sure you want to delete the article?'
            okText='I understand, delete!'
            handleClose={this.closeDeleteModal}
            handleOk={this.confirmDelete}
          >
            Everyone in your company will lose access to this article.
          </Modal>
        </>
      )
    }
    return <div />
  }
}

const mapStateToProps = state => ({
  article: state.articles.currentArticle,
  loading: state.articles.loading
})

const mapDispatchToProps = dispatch => ({
  loadArticlePage: id => dispatch(loadArticlePage(id)),
  disposeArticlePage: () => dispatch(disposeArticlePage())
})

export default connect(mapStateToProps, mapDispatchToProps)(ViewArticleContainer)
