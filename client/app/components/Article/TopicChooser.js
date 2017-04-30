import React from "react";
import { FormControl, ControlLabel } from "react-bootstrap";

const TopicChooser = props => {
  const { topics, onChange, value } = props;

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
};

export default TopicChooser;
