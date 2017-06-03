import React from "react";
import { Nav, NavItem } from "react-bootstrap";

const AdminNavBar = props => {
  return (
    <Nav
      bsStyle="tabs"
      className="admin-nav"
      justified
      activeKey={props.activeTab}
      onSelect={props.handleSelect}>
      <NavItem role="presentation" eventKey="users">
        Users
      </NavItem>
      <NavItem role="presentation" eventKey="topics">
        Topics
      </NavItem>
      <NavItem role="presentation" eventKey="design">
        Design
      </NavItem>
    </Nav>
  );
};

export default AdminNavBar;
