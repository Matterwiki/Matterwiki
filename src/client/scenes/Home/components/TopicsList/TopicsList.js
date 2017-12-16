import React from "react";
import { HelpBlock, ListGroup } from "react-bootstrap";
import { List, ListItem } from "ui";

import TopicsListItem from "./components/TopicsListItem";

const TopicsList = ({ topics, onTopicClick, activeTopic }) =>
  topics.length < 1
    ? <HelpBlock bsClass="center-align">
        There are no topics created yet
      </HelpBlock>
    : <List>
        {topics
          // .filter(t => t.id !== 1) // TODO Decide if we should show the uncategorized category
          .map(topic =>
            <TopicsListItem
              key={topic.id}
              topic={topic}
              onTopicClick={onTopicClick}
              isActive={activeTopic && activeTopic.id === topic.id}
            />
          )}
      </List>;

export default TopicsList;
