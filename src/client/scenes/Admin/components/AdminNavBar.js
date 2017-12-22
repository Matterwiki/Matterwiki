import React from "react";
import { Nav, NavItem, Icon } from "ui";

const AdminNavBar = ({ activeTab, handleSelect }) =>
  <Nav marginBottom="2">
    <NavItem
      onClick={e => handleSelect("users", e)}
      active={activeTab === "users"}
      tab
      cursorPointer>
      <Icon type="users" />Users
    </NavItem>
    <NavItem
      onClick={e => handleSelect("topics", e)}
      active={activeTab === "topics"}
      tab
      cursorPointer>
      <Icon type="folder" />Topics
    </NavItem>
  </Nav>;

export default AdminNavBar;
