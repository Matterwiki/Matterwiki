import React from "react";

import { ListGroupItem } from "react-bootstrap";
import { ListItem, ListItemHeader, ListItemBody } from "ui";

const TopicsListItem = ({ topic, onTopicClick }) => {
  const { id, name, description } = topic;

  // TODO wrap these into generic HOCs
  const handleTopicClick = e => {
    e.preventDefault();
    onTopicClick(id);
  };

  return (
    <ListItem onClick={handleTopicClick}>
      <ListItemHeader>
        {name}
      </ListItemHeader>
      <ListItemBody>
        {description}
      </ListItemBody>
    </ListItem>
  );
};

export default TopicsListItem;
