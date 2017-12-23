import React from "react";
import { List, ListItem, ListItemHeader, Icon } from "ui";
import { ListItemBody } from "../../../ui/list";

const AdminNavBar = ({ activeTab, handleSelect }) => (
  <List>
    <ListItem onClick={e => handleSelect("users", e)} active={activeTab === "users"} cursorPointer>
      <ListItemHeader>
        <Icon type="users" />
        Users
      </ListItemHeader>
      <ListItemBody>Create, edit, and delete users</ListItemBody>
    </ListItem>
    <ListItem
      onClick={e => handleSelect("topics", e)}
      active={activeTab === "topics"}
      cursorPointer>
      <ListItemHeader>
        <Icon type="folder" />
        Topics
      </ListItemHeader>
      <ListItemBody>Create, edit, and delete topics</ListItemBody>
    </ListItem>
    <ListItem
      onClick={e => handleSelect("customize", e)}
      active={activeTab === "customize"}
      cursorPointer>
      <ListItemHeader>
        <Icon type="settings" />
        Customize
      </ListItemHeader>
      <ListItemBody>Change the color scheme, and logo</ListItemBody>
    </ListItem>
  </List>
);

export default AdminNavBar;
