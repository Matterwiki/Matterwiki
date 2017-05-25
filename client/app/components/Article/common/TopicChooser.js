import React from "react";
import { FormControl, ControlLabel } from "react-bootstrap";

import APIProvider from "utils/APIProvider";

class TopicChooser extends React.Component {
  constructor(...args) {
    super(...args);

    this.state = {
      topics: []
    };
  }

  componentDidMount() {
    APIProvider.get("topics").then(topics => this.setState({ topics }));
  }

  render() {
    const { topics } = this.state;
    const { onChange, value } = this.props;

    return (
      <div>
        <ControlLabel>Choose topic</ControlLabel>
        <FormControl
          name="topic_id"
          componentClass="select"
          className="topic-select"
          value={value}
          onChange={onChange}>
          {topics.map(topic => (
            <option value={topic.id} key={topic.id}>{topic.name}</option>
          ))}
        </FormControl>
      </div>
    );
  }
}

export default TopicChooser;
