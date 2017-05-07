import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { ListGroupItem, Button } from "react-bootstrap";

const UsersListItem = ({ user, onDeleteClick }) => {
  const handleDeleteClick = e => {
    e.preventDefault();
    onDeleteClick(user.id);
  };

  return (
    <ListGroupItem header={decodeURIComponent(user.name)}>
      {decodeURIComponent(user.about) || "-"}
      <span className="pull-right">
        <LinkContainer to={`user/edit/${user.id}`}>
          <Button>Edit</Button>
        </LinkContainer>
        {user.id != 1 && <Button onClick={handleDeleteClick}>Delete</Button>}
      </span>
    </ListGroupItem>
  );
};

export default UsersListItem;
