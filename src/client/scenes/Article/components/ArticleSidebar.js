import React from "react";
import { Sidebar, Button, Icon } from "ui";
import ArticleSidebarItem from "./ArticleSidebarItem";

const ArticleSidebar = ({ article, isAdmin, onEditClick, onHistoryClick, onDeleteClick }) => (
  <Sidebar>
    <ArticleSidebarItem title="Filed under" iconType="folder">
      <h2 className="color-text">
        <b>{article.topic.name}</b>
      </h2>
    </ArticleSidebarItem>
    <ArticleSidebarItem title="Last Updated By" iconType="user">
      <b>{article.createdUser.name}</b>
      <p>{article.createdUser.about}</p>
    </ArticleSidebarItem>
    <ArticleSidebarItem title="What Changed in last edit" iconType="edit-3">
      {article.change_log || <h4>No information available</h4>}
    </ArticleSidebarItem>
    <Button onClick={onEditClick} block>
      <Icon type="edit" size="12" /> Edit
    </Button>
    <Button onClick={onHistoryClick} block>
      <Icon type="clock" size="12" /> History
    </Button>
    {isAdmin && (
      <Button block onClick={onDeleteClick}>
        <Icon type="trash-2" size="12" /> Delete
      </Button>
    )}
  </Sidebar>
);

export default ArticleSidebar;
