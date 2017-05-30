import React from "react";
import { ListGroup, ListGroupItem, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const ResourceListItem = ({ item, itemName, onDeleteClick }) => {
  const handleDeleteClick = e => {
    e.preventDefault();
    onDeleteClick(item.id);
  };

  return (
    <ListGroupItem header={item.name}>
      {/* Only used in the Admin section at this point. If this were to be used elswehere, 
          a schema level change is inevitable */}
      {item.description || item.about || "-"}
      <span className="pull-right">
        <LinkContainer to={`${itemName}/edit/${item.id}`}>
          <Button>Edit</Button>
        </LinkContainer>
        {item.id != 1 && <Button onClick={handleDeleteClick}>Delete</Button>}
      </span>
    </ListGroupItem>
  );
};

const ResourceList = ({ items, itemName, onDeleteClick }) => (
  <ListGroup>
    {items.map(item => (
      <ResourceListItem
        key={item.id}
        item={item}
        itemName={itemName}
        onDeleteClick={onDeleteClick}
      />
    ))}
  </ListGroup>
);

export default ResourceList;
