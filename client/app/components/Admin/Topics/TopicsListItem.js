import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { ListGroupItem, Button } from "react-bootstrap";

const TopicsListItem = ({ topic, onDeleteClick }) => {
  const handleDeleteClick = e => {
    e.preventDefault();
    onDeleteClick(topic.id);
  };

  return (
    <ListGroupItem header={decodeURIComponent(topic.name)}>
      {decodeURIComponent(topic.description) || "-"}
      <span className="pull-right">
        <LinkContainer to={`topic/edit/${topic.id}`}>
          <Button>Edit</Button>
        </LinkContainer>
        {topic.id != 1 && <Button onClick={handleDeleteClick}>Delete</Button>}
      </span>
    </ListGroupItem>
  );
};

export default TopicsListItem;
