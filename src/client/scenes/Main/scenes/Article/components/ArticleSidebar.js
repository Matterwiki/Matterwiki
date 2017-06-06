import React from "react";
import { Button } from "react-bootstrap";
import ArticleSidebarItem from "./ArticleSidebarItem";

const ArticleSidebar = props => {
  const {
    article,
    isAdmin,
    onEditClick,
    onHistoryClick,
    onDeleteClick
  } = props;
  
  const { topic, user, what_changed } = article;

  return (
    <div className="article-sidebar">
      <ArticleSidebarItem title="Filed under">
        <h2 className="color-text">
          <b>{topic.name}</b>
        </h2>
      </ArticleSidebarItem>
      <ArticleSidebarItem title="Last Updated By">
        <h3>
          <b>{user.name}</b>
        </h3>
        <p>{user.about}</p>
      </ArticleSidebarItem>
      <ArticleSidebarItem title="What Changed in last edit">
        {what_changed || <h4>No information available</h4>}
      </ArticleSidebarItem>
      <Button onClick={onEditClick} block={true}>Edit</Button>
      <Button onClick={onHistoryClick} block={true}>History</Button>
      {isAdmin &&
        <Button block={true} onClick={onDeleteClick}>
          Delete
        </Button>}
    </div>
  );
};

export default ArticleSidebar;
