import React from "react";
import { FormControl, ControlLabel } from "react-bootstrap";

import API from "api/wrapper.js";

class TopicChooser extends React.Component {
  constructor(...args) {
    super(...args);

    this.state = {
      topics: []
    };
  }

  componentDidMount() {
    API.call(
      "topics",
      "GET",
      window.localStorage.getItem("userToken")
    ).then(response => {
      this.setState({
        topics: response.data
      });
    });
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
