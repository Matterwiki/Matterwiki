import React from "react";
import { hashHistory, Link } from "react-router";
import { Grid, Row, Col } from "react-bootstrap";

import Alert from "react-s-alert";
import Loader from "Loader/index";

import TopicsList from "./TopicsList";
import TopicForm from "./TopicForm";

import API from "api/wrapper.js";

class Topics extends React.Component {
  constructor(props) {
    super(props);

    this.addTopic = this.addTopic.bind(this);
    this.deleteTopic = this.deleteTopic.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.state = {
      loading: true,
      topics: []
    };
  }

  handleUpdate() {
    this.setState({ loading: true });
    API.call(
      "topics",
      "GET",
      window.localStorage.getItem("userToken")
    ).then(topics => {
      this.setState({
        topics: topics.data,
        loading: false
      });
    });
  }

  componentDidMount() {
    this.handleUpdate();
  }

  deleteTopic(id) {
    API.call(
      `topics?id=${id}`,
      "DELETE",
      window.localStorage.getItem("userToken")
    ).then(topic => {
      Alert.success("Topic has been deleted");
      this.handleUpdate();
    });
  }

  addTopic(topic) {
    API.call(
      "topics",
      "POST",
      window.localStorage.getItem("userToken"),
      topic
    ).then(topic => {
      Alert.success("Topic has been added");
      this.handleUpdate();
    });
  }

  render() {
    if (this.state.loading) return <Loader />;
    else
      return (
        <Grid>
          <Row className="topics">
            <Col sm={12} md={4}>
              <Row>
                <Col md={12} sm={12}>
                  <TopicForm onSubmit={this.addTopic} />
                </Col>
              </Row>
            </Col>
            <Col sm={12} md={8}>
              <TopicsList
                topics={this.state.topics}
                onDeleteClick={this.deleteTopic}
              />
            </Col>
          </Row>
        </Grid>
      );
  }
}

export default Topics;
