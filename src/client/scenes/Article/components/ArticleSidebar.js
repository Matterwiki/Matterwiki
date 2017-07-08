import React from "react";
import { Button } from "react-bootstrap";
import ArticleSidebarItem from "./ArticleSidebarItem";

const ArticleSidebar = ({
  article,
  isAdmin,
  onEditClick,
  onHistoryClick,
  onDeleteClick
}) =>
  <div className="article-sidebar">
    <ArticleSidebarItem title="Filed under">
      <h2 className="color-text">
        <b>
          {article.topic.name}
        </b>
      </h2>
    </ArticleSidebarItem>
    <ArticleSidebarItem title="Last Updated By">
      <h3>
        <b>
          {article.user.name}
        </b>
      </h3>
      <p>
        {article.user.about}
      </p>
    </ArticleSidebarItem>
    <ArticleSidebarItem title="What Changed in last edit">
      {article.what_changed || <h4>No information available</h4>}
    </ArticleSidebarItem>
    <Button onClick={onEditClick} block>
      Edit
    </Button>
    <Button onClick={onHistoryClick} block>
      History
    </Button>
    {isAdmin &&
      <Button block onClick={onDeleteClick}>
        Delete
      </Button>}
  </div>;

export default ArticleSidebar;
