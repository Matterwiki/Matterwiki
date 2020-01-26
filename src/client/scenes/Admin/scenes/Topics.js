import React from 'react'
import { Row, Col, Modal } from 'ui'
import APIProvider from 'utils/APIProvider'
import { connect } from 'react-redux'

import Alert from 'react-s-alert'
import Loader from 'ui/loader'

import {
  loadTopicsPage,
  disposeTopicsPage,
  fetchTopicsByPage,
  loadEditTopic,
  disposeEditTopic
} from 'store/modules/sagaActions'

import ItemList from '../components/ItemList'
import ItemForm from '../components/ItemForm'

// TODO move these fellas to a nice consts file
const TOPIC_FORM_FIELDS = [{ name: 'name', type: 'text' }, { name: 'description', type: 'text' }]

// TODO MangeUsers and ManageTopics are basically the same with different endpoints. Abstract!
class ManageTopics extends React.Component {
  state = {
    topicId: null,
    showDeleteModal: false,
    appendingTopics: false
  };

  componentDidMount () {
    this.handleUpdate()
  }

  componentWillUnmount () {
    this.props.disposeTopicsPage()
  }

  handleUpdate = () => {
    this.props.loadTopicsPage()
  };

  handleEditClick = id => {
    this.props.loadEditTopic(id)
  };

  handleDeleteClick = id => {
    this.setState({ showDeleteModal: true, topicId: id })
  };

  confirmDelete = () => {
    APIProvider.delete(`topics/${this.state.topicId}`).then(() => {
      Alert.success('Topic has been deleted')
      this.handleUpdate()
    })
  };

  closeDeleteModal = () => {
    this.setState({ showDeleteModal: false, topicId: null })
  };

  updateTopic = topic => {
    const id = this.props.currentTopic.id
    APIProvider.put(`topics/${id}`, topic).then(() => {
      Alert.success('Topic has been edited')
      this.props.disposeEditTopic()
      this.handleUpdate()
    })
  };

  addTopic = topic => {
    APIProvider.post('topics', topic).then(() => {
      Alert.success('Topic has been added')
      this.handleUpdate()
    })
  };

  handleOnCancel = () => {
    this.props.disposeEditTopic()
  };

  handleLoadMore = e => {
    e.preventDefault()
    this.setState({ appendingTopics: true })
    const { pageNumber } = this.props.topicsMeta
    this.props.fetchTopicsByPage(pageNumber + 1, () => {
      this.setState({ appendingTopics: false })
    })
  };

  render () {
    const { topics, currentTopic, loading, topicsMeta } = this.props
    const { showDeleteModal, appendingTopics } = this.state
    if (loading) {
      return <Loader />
    }

    const onSubmit = currentTopic ? this.updateTopic : this.addTopic
    return (
      <>
        <Row>
          <Col widthMedium='40' withSmall='100'>
            <ItemForm
              itemFormFields={TOPIC_FORM_FIELDS}
              itemName='topic'
              item={currentTopic}
              onSubmit={onSubmit}
              onCancelUpdate={this.handleOnCancel}
            />
          </Col>
          <Col>
            <ItemList
              items={topics}
              itemName='topic'
              onDeleteClick={this.handleDeleteClick}
              onEditClick={this.handleEditClick}
              onLoadMoreClick={this.handleLoadMore}
              appendingItems={appendingTopics}
              itemsMeta={topicsMeta}
            />
          </Col>
        </Row>
        <Modal
          visible={showDeleteModal}
          title='Are you sure?'
          okText='I understand, delete!'
          handleClose={this.closeDeleteModal}
          handleOk={this.confirmDelete}
        >
          Deleting the topic will move all of its articles to Uncategorized. Are you sure?
        </Modal>
      </>
    )
  }
}

const mapStateToProps = state => ({
  topics: state.topics.topics.all,
  topicsMeta: state.topics.topics.meta,
  loading: state.topics.loading,
  currentTopic: state.topics.currentTopic
})

const mapDispatchToProps = dispatch => ({
  loadTopicsPage: () => dispatch(loadTopicsPage()),
  disposeTopicsPage: () => disposeTopicsPage(disposeTopicsPage()),
  loadEditTopic: id => dispatch(loadEditTopic(id)),
  disposeEditTopic: () => dispatch(disposeEditTopic()),
  fetchTopicsByPage: (page, callback) => dispatch(fetchTopicsByPage(page, callback))
})

export default connect(mapStateToProps, mapDispatchToProps)(ManageTopics)
