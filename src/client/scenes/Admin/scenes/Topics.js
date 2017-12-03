import React from "react";
import { Grid, Row, Col } from "react-bootstrap";
import APIProvider from "utils/APIProvider";
import { connect } from "react-redux";

import Alert from "react-s-alert";
import Loader from "components/Loader/Loader";

import { addTopics, startLoading, stopLoading } from "state/actions/topic";
import store from "state/store";

import ItemList from "../components/ItemList";
import ItemForm from "../components/ItemForm";

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

  componentDidMount() {
    this.handleUpdate();
  }

  handleUpdate = () => {
    // this.setState({ loading: true });
    store.dispatch(startLoading());
    APIProvider.get("topics").then(topics => {
      store.dispatch(addTopics(topics));
      store.dispatch(stopLoading());
    });
  };

  handleEditClick = id => {
    APIProvider.get(`topics/${id}`).then(currentTopic => {
      this.setState({
        currentTopic
      });
    });
  };

  deleteTopic = id => {
    APIProvider.delete(`topics/${id}`).then(() => {
      Alert.success("Topic has been deleted");
      this.handleUpdate();
    });
  };

  updateTopic = topic => {
    const id = this.state.currentTopic.id;
    APIProvider.put(`topics/${id}`, topic).then(() => {
      Alert.success("Topic has been edited");
      this.setState({
        currentTopic: null
      });
      this.handleUpdate();
    });
  };

  addTopic = topic => {
    APIProvider.post("topics", topic).then(() => {
      Alert.success("Topic has been added");
      this.handleUpdate();
    });
  };

  emptyCurrentTopicState = () => {
    this.setState({ currentTopic: null });
  };

  render() {
    const { topics, loading } = store.getState().topics;
    if (loading) {
      return <Loader />;
    }

    const onSubmit = this.state.currentTopic ? this.updateTopic : this.addTopic;
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
              items={topics}
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

const mapStateToProps = state => ({
  topics: state.topics.topics
});

export default connect(mapStateToProps)(ManageTopics);
