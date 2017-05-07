import React from "react";
import { hashHistory } from "react-router";
import Alert from "react-s-alert";
import { Grid, Row, Col } from "react-bootstrap";
import Loader from "Loader/index";
import API from "api/wrapper.js";

import TopicForm from "./TopicForm";

class EditTopic extends React.Component {
  constructor(props) {
    super(props);
    this.editTopic = this.editTopic.bind(this);
    this.state = { topic: null };
  }

  componentDidMount() {
    this.setState({
      loading: true
    });
    API.call(
      `topics/${this.props.params.topicId}`,
      "GET",
      window.localStorage.getItem("userToken")
    ).then(topic => {
      this.setState({
        topic: topic.data,
        loading: false
      });
    });
  }

  editTopic(topic) {
    topic = {
      name: encodeURIComponent(topic.name),
      description: encodeURIComponent(topic.description),
      id: this.props.params.topicId
    };
    API.call(
      "topics",
      "PUT",
      window.localStorage.getItem("userToken"),
      topic
    ).then(function(topic) {
      Alert.success("Topic has been edited");
      hashHistory.push("admin");
    });
  }

  render() {
    if (this.state.loading) return <Loader />;
    else
      return (
        <Grid>
          <Row>
            <Col md={12} sm={12}>
              <h1><b>Update Topic</b></h1>
              <br />
              <TopicForm topic={this.state.topic} onSubmit={this.editTopic} />
            </Col>
          </Row>
        </Grid>
      );
  }
}

export default EditTopic;
