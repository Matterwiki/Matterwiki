import React from "react";
import { HelpBlock, ListGroup } from "react-bootstrap";

import TopicsListItem from "./components/TopicsListItem";

const TopicsList = props => {
  return props.topics.length < 1
    ? <HelpBlock bsClass="center-align">
        There are no topics created yet
      </HelpBlock>
    : <ListGroup>
        {props.topics.map(topic => (
          <TopicsListItem
            key={topic.id}
            topic={topic}
            onTopicClick={props.onTopicClick}
          />
        ))}
      </ListGroup>;
};

export default TopicsList;
