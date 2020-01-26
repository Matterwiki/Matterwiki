import React from 'react'
import { Form, FormGroup, FormControl, Col, Clearfix, Button } from 'react-bootstrap'
import Alert from 'react-s-alert'

import WikiEditor from '../WikiEditor/WikiEditor'
import TopicChooser from './components/TopicChooser'
import WhatChanged from './components/WhatChanged'

class ArticleForm extends React.Component {
  constructor (...args) {
    super(...args)

    const { article } = this.props

    if (!article) {
      this.state = {
        edit: false,
        title: '',
        topicId: 1
      }
    } else {
      const { topic_id: topicId, title, change_log: changeLog } = article

      this.state = {
        edit: true,
        title,
        topicId,
        changeLog
      }
    }
  }

  handleChange = e => {
    const { name, value } = e.target

    this.setState({
      [name]: value
    })
  };

  handleSubmit = e => {
    e.preventDefault()

    // get the rawContent from refs
    // TODO this will change when we use Redux! :)
    const content = this.getEditorContent()
    const { title, topicId, changeLog, edit } = this.state

    const canSubmit = edit
      ? content && title && topicId && changeLog
      : content && title && topicId

    const changeInfo = edit ? ', Change info' : ''
    const errorMessage = `Article Body, Title${changeInfo} and Topic Information is required.`

    if (canSubmit) {
      const formData = { title, content, topic_id: topicId }
      if (edit) {
        formData.change_log = changeLog
      }

      this.props.onSubmit(formData)
    } else {
      Alert.error(errorMessage)
    }
  };

  getEditorContent = () => JSON.stringify(this.editor.getRawContent());

  render () {
    const { edit } = this.state
    const WikiEditorProps = Object.assign(
      {},
      { ref: _editor => (this.editor = _editor) },
      edit ? { rawContent: JSON.parse(this.props.article.content) } : {}
    )

    return (
      <Form className='new-article' onSubmit={this.handleSubmit}>
        <Col sm={12}>
          <FormGroup>
            <FormControl
              type='text'
              name='title'
              className='input-title'
              placeholder='Enter article title...'
              value={this.state.title}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <WikiEditor {...WikiEditorProps} />
          </FormGroup>
          <FormGroup>
            <TopicChooser onChange={this.handleChange} value={this.state.topicId} />
          </FormGroup>
          {this.props.article && (
            <FormGroup>
              <WhatChanged onChange={this.handleChange} value={this.state.changeLog} />
            </FormGroup>
          )}
        </Col>
        <Clearfix />
        <br />
        <Col sm={12}>
          <Button type='submit' block>
            {`${edit ? 'Update' : 'Create'} Article`}
          </Button>
        </Col>
      </Form>
    )
  }
}

export default ArticleForm
