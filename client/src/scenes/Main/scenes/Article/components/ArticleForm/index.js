import React from "react";
import {
  Form,
  FormGroup,
  FormControl,
  Col,
  Clearfix,
  Button
} from "react-bootstrap";
import Alert from "react-s-alert";

import WikiEditor from "../WikiEditor/index";
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
      const { topic_id, title, what_changed } = article;

      this.state = {
        edit: true,
        title,
        topic_id,
        what_changed
      };
    }

    this.getEditorContent = this.getEditorContent.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  getEditorContent() {
    return JSON.stringify(this.refs.editor.getRawContent());
  }

  onChange(e) {
    const { name, value } = e.target;

    this.setState({
      [name]: value
    });
  }

  onSubmit(e) {
    e.preventDefault();

    // get the rawContent from refs
    // TODO this will change when we use Redux! :)
    const body = this.getEditorContent();
    const { title, topic_id, what_changed, edit } = this.state;

    const canSubmit = edit
      ? body && title && topic_id && what_changed
      : body && title && topic_id;

    const changeInfo = edit ? ", Change info" : "";
    const errorMessage = `Article Body, Title${changeInfo} and Topic Information is required.`;

    if (canSubmit) {
      const user_id = window.localStorage.getItem("userId");
      const formData = { title, body, topic_id, user_id };
      if (edit) formData.what_changed = what_changed;

      this.props.onSubmit(formData);
    } else {
      Alert.error(errorMessage);
    }
  }

  render() {
    const { edit } = this.state;
    const WikiEditorProps = Object.assign(
      {},
      { ref: "editor" },
      edit ? { rawContent: JSON.parse(this.props.article.body) } : {}
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
            <TopicChooser
              onChange={this.onChange}
              value={this.state.topic_id}
            />
          </FormGroup>
          {this.props.article &&
            <FormGroup>
              <WhatChanged
                onChange={this.onChange}
                value={this.state.what_changed}
              />
            </FormGroup>}
        </Col>
        <Clearfix />
        <br />
        <Col sm={12}>
          <Button type="submit" block={true}>
            {`${edit ? "Update" : "Create"} Article`}
          </Button>
        </Col>
      </Form>
    );
  }
}

export default ArticleForm;
