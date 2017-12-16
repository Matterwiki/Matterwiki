import React from "react";
import { Nav, NavItem } from "ui";

const AdminNavBar = ({ activeTab, handleSelect }) =>
  <Nav marginBottom="2">
    <NavItem
      onClick={e => handleSelect("users", e)}
      active={activeTab === "users"}
      tab
      cursorPointer>
      Users
    </NavItem>
    <NavItem
      onClick={e => handleSelect("topics", e)}
      active={activeTab === "topics"}
      tab
      cursorPointer>
      Topics
    </NavItem>
  </Nav>;

export default AdminNavBar;
