import React from "react";
import { Sidebar, Button } from "ui";
import ArticleSidebarItem from "./ArticleSidebarItem";

const ArticleSidebar = ({
  article,
  isAdmin,
  onEditClick,
  onHistoryClick,
  onDeleteClick
}) =>
  <Sidebar>
    <ArticleSidebarItem title="Filed under">
      <h2 className="color-text">
        <b>
          {article.topic.name}
        </b>
      </h2>
    </ArticleSidebarItem>
    <ArticleSidebarItem title="Last Updated By">
      <b>
        {article.createdUser.name}
      </b>
      <p>
        {article.createdUser.about}
      </p>
    </ArticleSidebarItem>
    <ArticleSidebarItem title="What Changed in last edit">
      {article.change_log || <h4>No information available</h4>}
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
  </Sidebar>;

export default ArticleSidebar;
