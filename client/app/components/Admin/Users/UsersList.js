import React from "react";
import { ListGroup } from "react-bootstrap";

import UsersListItem from './UsersListItem';

const UsersList = props => {
  const { users, onDeleteClick } = props;

  return (
    <div className="users">
      <ListGroup className="bordered-scroll-box">
        {users.map(user => (
          <UsersListItem
            key={user.id}
            user={user}
            onDeleteClick={onDeleteClick}
          />
        ))}
      </ListGroup>
    </div>
  );
};

export default UsersList;
