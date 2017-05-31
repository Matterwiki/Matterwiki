import React from "react";
import { ListGroup, ListGroupItem, Button } from "react-bootstrap";

const ResourceListItem = ({ item, itemName, onEditClick, onDeleteClick }) => {
  const handleDeleteClick = e => {
    e.preventDefault();
    onDeleteClick(item.id);
  };

  const handleEditClick = e => {
    e.preventDefault();
    onEditClick(item.id);
  };

  return (
    <ListGroupItem header={item.name}>
      {/* Only used in the Admin section at this point. If this were to be used elswehere, 
          a schema level change is inevitable */}
      {item.description || item.about || "-"}
      <span className="pull-right">
        <Button onClick={handleEditClick}>Edit</Button>
        {item.id != 1 && <Button onClick={handleDeleteClick}>Delete</Button>}
      </span>
    </ListGroupItem>
  );
};

const ResourceList = ({ items, itemName, onEditClick, onDeleteClick }) => (
  <ListGroup>
    {items.map(item => (
      <ResourceListItem
        key={item.id}
        item={item}
        itemName={itemName}
        onEditClick={onEditClick}
        onDeleteClick={onDeleteClick}
      />
    ))}
  </ListGroup>
);

export default ResourceList;
