import React from "react";

import { ListGroupItem } from "react-bootstrap";

const TopicsListItem = ({ topic, onTopicClick }) => {
  const { id, name, description } = topic;

  // TODO wrap these into generic HOCs
  const handleTopicClick = e => {
    e.preventDefault();
    onTopicClick(id);
  };

  return (
    <ListGroupItem header={name} onClick={handleTopicClick}>
      {description}
    </ListGroupItem>
  );
};

export default TopicsListItem;
