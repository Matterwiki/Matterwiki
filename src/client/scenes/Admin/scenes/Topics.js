import React from "react";
import { Row, Col } from "ui";
import APIProvider from "utils/APIProvider";
import { connect } from "react-redux";

import Alert from "react-s-alert";
import Loader from "components/Loader/Loader";

import store from "state/store";
import {
  loadTopicsPage,
  disposeTopicsPage,
  loadEditTopic,
  disposeEditTopic
} from "state/actions/sagaActions";

import ItemList from "../components/ItemList";
import ItemForm from "../components/ItemForm";

// TODO move these fellas to a nice consts file
const TOPIC_FORM_FIELDS = [
  { name: "name", type: "text" },
  { name: "description", type: "text" }
];

// TODO MangeUsers and ManageTopics are basically the same with different endpoints. Abstract!
class ManageTopics extends React.Component {
  componentDidMount() {
    this.handleUpdate();
  }

  handleUpdate = () => {
    store.dispatch(loadTopicsPage());
  };

  handleEditClick = id => {
    store.dispatch(loadEditTopic(id));
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
      store.dispatch(disposeEditTopic());
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
    store.dispatch(disposeEditTopic());
  };

  render() {
    const { topics: { topics, loading, currentTopic } } = store.getState();
    if (loading) {
      return <Loader />;
    }

    const onSubmit = currentTopic ? this.updateTopic : this.addTopic;
    return (
      <Row>
        <Col width="25">
          <ItemForm
            itemFormFields={TOPIC_FORM_FIELDS}
            itemName="topic"
            item={currentTopic}
            onSubmit={onSubmit}
            onCancelUpdate={this.emptyCurrentTopicState}
          />
        </Col>
        <Col>
          <ItemList
            items={topics}
            itemName="topic"
            onDeleteClick={this.deleteTopic}
            onEditClick={this.handleEditClick}
          />
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = state => ({
  topics: state.topics.topics,
  loading: state.topics.loading,
  currentTopic: state.topics.currentTopic
});

export default connect(mapStateToProps)(ManageTopics);
