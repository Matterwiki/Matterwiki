import React from "react";
import { HelpBlock, ListGroup } from "react-bootstrap";

import TopicsListItem from "./components/TopicsListItem";

const TopicsList = ({ topics, onTopicClick }) =>
  topics.length < 1
    ? <HelpBlock bsClass="center-align">
        There are no topics created yet
      </HelpBlock>
    : <ListGroup>
        {topics.map(topic =>
          <TopicsListItem
            key={topic.id}
            topic={topic}
            onTopicClick={onTopicClick}
          />
        )}
      </ListGroup>;

export default TopicsList;
