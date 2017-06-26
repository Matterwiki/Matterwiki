import React from "react";
import { hashHistory, Link } from "react-router";
import { Grid, Row, Col } from "react-bootstrap";

import Alert from "react-s-alert";
import Loader from "components/Loader/Loader";

import ItemList from "../components/ItemList";
import ItemForm from "../components/ItemForm";

import APIProvider from "utils/APIProvider";

// TODO move these fellas to a nice consts file
const TOPIC_FORM_FIELDS = [
  { name: "name", type: "text" },
  { name: "description", type: "text" }
];

// TODO MangeUsers and ManageTopics are basically the same with different endpoints. Abstract!
class ManageTopics extends React.Component {
  state = {
    topics: [],
    currentTopic: null
  };

  handleUpdate = () => {
    this.setState({ loading: true });
    APIProvider.get("topics").then(topics => {
      this.setState({
        topics,
        loading: false
      });
    });
  };

  handleEditClick = id => {
    APIProvider.get(`topics/${id}`).then(currentTopic => {
      this.setState({
        currentTopic
      });
    });
  };

  componentDidMount() {
    this.handleUpdate();
  }

  deleteTopic = id => {
    APIProvider.delete(`topics?id=${id}`).then(topic => {
      Alert.success("Topic has been deleted");
      this.handleUpdate();
    });
  };

  updateTopic = topic => {
    topic.id = this.state.currentTopic.id;
    APIProvider.put("topics", topic).then(topic => {
      Alert.success("Topic has been edited");
      this.setState({
        currentTopic: null
      });
      this.handleUpdate();
    });
  };

  addTopic = topic => {
    APIProvider.post("topics", topic).then(topic => {
      Alert.success("Topic has been added");
      this.handleUpdate();
    });
  };

  emptyCurrentTopicState = () => {
    this.setState({ currentTopic: null });
  };

  render() {
    if (this.state.loading) return <Loader />;
    else {
      const onSubmit = this.state.currentTopic
        ? this.updateTopic
        : this.addTopic;
      return (
        <Grid>
          <Row>
            <Col sm={12} md={4}>
              <Row>
                <Col md={12} sm={12}>
                  <ItemForm
                    itemFormFields={TOPIC_FORM_FIELDS}
                    itemName="topic"
                    item={this.state.currentTopic}
                    onSubmit={onSubmit}
                    onCancelUpdate={this.emptyCurrentTopicState}
                  />
                </Col>
              </Row>
            </Col>
            <Col sm={12} md={8}>
              <ItemList
                items={this.state.topics}
                itemName="topic"
                onDeleteClick={this.deleteTopic}
                onEditClick={this.handleEditClick}
              />
            </Col>
          </Row>
        </Grid>
      );
    }
  }
}

export default ManageTopics;
