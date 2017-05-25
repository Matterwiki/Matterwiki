import React from "react";

import { ListGroupItem } from "react-bootstrap";

const TopicsListItem = props => {
  const { id, name, description } = props.topic;
  // TODO wrap these into generic HOCs
  const onTopicClick = e => {
    e.preventDefault();
    props.onTopicClick(id);
  };

  return (
    <ListGroupItem header={name} onClick={onTopicClick} href="#">
      {description}
    </ListGroupItem>
  );
};

export default TopicsListItem;
