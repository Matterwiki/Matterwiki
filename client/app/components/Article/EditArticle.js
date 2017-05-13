import React from "react";
import { hashHistory } from "react-router";
import Alert from "react-s-alert";
import Loader from "Loader/index";

import {
  Row,
  Col,
  Button,
  Form,
  Clearfix,
  FormGroup,
  FormControl
} from "react-bootstrap";

import WikiEditor from "WikiEditor/index.jsx";
import TopicChooser from "./TopicChooser";
import WhatChanged from "./WhatChanged";

import API from "api/wrapper.js";

// TODO EditArticle & ViewArticle are mostly same - abstract it into one component
class EditArticle extends React.Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.getStringifiedEditorContent = this.getStringifiedEditorContent.bind(
      this
    );
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      loading: true
    };
  }

  onChange(e) {
    const { name, value } = e.target;

    this.setState({
      article: Object.assign({}, this.state.article, {
        [name]: value
      })
    });
  }

  getStringifiedEditorContent() {
    return JSON.stringify(this.refs.editor.getRawContent());
  }

  handleSubmit(e) {
    e.preventDefault();
    const userId = window.localStorage.getItem("userId");
    const userToken = window.localStorage.getItem("userToken");

    const article = Object.assign({}, this.state.article, {
      body: this.getStringifiedEditorContent(),
      user_id: userId
    });

    if (
      article.body &&
      article.title &&
      article.topic_id &&
      article.what_changed
    ) {
      API.call("articles", "PUT", userToken, article)
        .then(article => {
          Alert.success("Article has been successfully saved");
          hashHistory.push(`article/${this.props.params.articleId}`);
        })
        .catch(err => {
          Alert.error(response.error.message);
        });
    } else {
      Alert.error("Article Body, Title, Topic and Change Info is required.");
    }
  }

  componentDidMount() {
    this.setState({
      loading: true
    });

    const articleId = this.props.params.articleId;
    const userToken = window.localStorage.getItem("userToken");

    Promise.all([
      API.call(`articles/${articleId}`, "GET", userToken),
      API.call("topics", "GET", userToken)
    ])
      .then(responses => {
        const article = responses[0].data;
        const topics = responses[1].data;

        article.what_changed = "";

        this.setState({
          article,
          topics,
          loading: false
        });
      })
      .catch(function(err) {
        Alert.error(err);
      });
  }

  render() {
    const { loading, topics, article } = this.state;

    return (
      (loading && <Loader />) ||
      <Form className="new-article" onSubmit={this.handleSubmit}>
        <Col sm={12}>
          <FormGroup>
            <FormControl
              type="text"
              name="title"
              className="input-title"
              placeholder="Enter article title..."
              value={decodeURIComponent(article.title)}
              onChange={this.onChange}
            />
          </FormGroup>
          <FormGroup>
            <WikiEditor
              ref="editor"
              rawContent={JSON.parse(decodeURIComponent(article.body))}
            />
          </FormGroup>
          <FormGroup>
            <TopicChooser
              onChange={this.onChange}
              topics={topics}
              value={article.topicId}
            />
          </FormGroup>
          <FormGroup>
            <WhatChanged onChange={this.onChange} />
          </FormGroup>
        </Col>
        <Clearfix />
        <br />
        <Col sm={12}>
          <Button type="submit" block={true}>
            Update Article
          </Button>
        </Col>
      </Form>
    );
  }
}

export default EditArticle;
