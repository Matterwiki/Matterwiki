import React from "react";
import { ListGroup } from "react-bootstrap";

import TopicsListItem from "./TopicsListItem";

const TopicsList = props => {
  const { topics, onDeleteClick } = props;

  return (
    <div className="topics">
      <ListGroup className="bordered-scroll-box">
        {topics.map(topic => (
          <TopicsListItem
            key={topic.id}
            topic={topic}
            onDeleteClick={onDeleteClick}
          />
        ))}
      </ListGroup>
    </div>
  );
};

export default TopicsList;
