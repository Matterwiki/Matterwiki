import React from "react";
import { Nav, NavItem } from "react-bootstrap";

const AdminNavBar = ({ activeTab, handleSelect }) => (
  <Nav bsStyle="tabs" className="admin-nav" justified activeKey={activeTab} onSelect={handleSelect}>
    <NavItem role="presentation" eventKey="users">
      Users
    </NavItem>
    <NavItem role="presentation" eventKey="topics">
      Topics
    </NavItem>
  </Nav>
);

export default AdminNavBar;
