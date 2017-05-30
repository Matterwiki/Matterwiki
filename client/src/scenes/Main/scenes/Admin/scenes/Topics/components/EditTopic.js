import React from "react";
import { hashHistory } from "react-router";
import Alert from "react-s-alert";
import { Grid, Row, Col } from "react-bootstrap";
import Loader from "Loader/index";
import APIProvider from "utils/APIProvider";

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
    APIProvider.get(`topics/${this.props.params.topicId}`).then(topic => {
      this.setState({
        topic,
        loading: false
      });
    });
  }

  editTopic(topic) {
    topic.id = this.props.params.topicId;

    APIProvider.put("topics", topic).then(function(topic) {
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
