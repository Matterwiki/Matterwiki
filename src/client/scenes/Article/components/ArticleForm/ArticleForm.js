import React from "react";
import { Form, FormGroup, FormControl, Col, Clearfix, Button } from "react-bootstrap";
import Alert from "react-s-alert";

import WikiEditor from "../WikiEditor/WikiEditor";
import TopicChooser from "./components/TopicChooser";
import WhatChanged from "./components/WhatChanged";

class ArticleForm extends React.Component {
  constructor(...args) {
    super(...args);

    const { article } = this.props;

    if (!article) {
      this.state = {
        edit: false,
        title: "",
        topic_id: 1
      };
    } else {
      const { topic_id, title, change_log } = article;

      this.state = {
        edit: true,
        title,
        topic_id,
        change_log
      };
    }
  }

  onChange = e => {
    const { name, value } = e.target;

    this.setState({
      [name]: value
    });
  };

  onSubmit = e => {
    e.preventDefault();

    // get the rawContent from refs
    // TODO this will change when we use Redux! :)
    const content = this.getEditorContent();
    const { title, topic_id, change_log, edit } = this.state;

    const canSubmit = edit
      ? content && title && topic_id && change_log
      : content && title && topic_id;

    const changeInfo = edit ? ", Change info" : "";
    const errorMessage = `Article Body, Title${changeInfo} and Topic Information is required.`;

    if (canSubmit) {
      const formData = { title, content, topic_id };
      if (edit) {
        formData.change_log = change_log;
      }

      this.props.onSubmit(formData);
    } else {
      Alert.error(errorMessage);
    }
  };

  getEditorContent = () => JSON.stringify(this.editor.getRawContent());

  render() {
    const { edit } = this.state;
    const WikiEditorProps = Object.assign(
      {},
      { ref: _editor => (this.editor = _editor) },
      edit ? { rawContent: JSON.parse(this.props.article.content) } : {}
    );

    return (
      <Form className="new-article" onSubmit={this.onSubmit}>
        <Col sm={12}>
          <FormGroup>
            <FormControl
              type="text"
              name="title"
              className="input-title"
              placeholder="Enter article title..."
              value={this.state.title}
              onChange={this.onChange}
            />
          </FormGroup>
          <FormGroup>
            <WikiEditor {...WikiEditorProps} />
          </FormGroup>
          <FormGroup>
            <TopicChooser onChange={this.onChange} value={this.state.topic_id} />
          </FormGroup>
          {this.props.article && (
            <FormGroup>
              <WhatChanged onChange={this.onChange} value={this.state.change_log} />
            </FormGroup>
          )}
        </Col>
        <Clearfix />
        <br />
        <Col sm={12}>
          <Button type="submit" block>
            {`${edit ? "Update" : "Create"} Article`}
          </Button>
        </Col>
      </Form>
    );
  }
}

export default ArticleForm;
