import React from "react";
import Alert from "react-s-alert";
import { Row, Col } from "ui";

import ArticleHeading from "../components/ArticleHeading";
import WikiEditor from "../components/WikiEditor/WikiEditor";
import ArticleSidebar from "../components/ArticleSidebar";

const ViewArticle = props => {
  const article = props.article;
  const isAdmin = parseInt(window.localStorage.getItem("userId"), 10) === 1;
  const handleDeleteClick = props.handleDeleteClick;
  const handleEditClick = props.handleEditClick;
  const handleHistoryClick = props.handleHistoryClick;

  return (
    <Row>
      <Col>
        <ArticleHeading article={article}>{article.title}</ArticleHeading>
        <WikiEditor readOnly rawContent={JSON.parse(article.content)} />
      </Col>
      <Col widthMedium="30">
        <ArticleSidebar
          article={article}
          onEditClick={handleEditClick}
          onDeleteClick={handleDeleteClick}
          onHistoryClick={handleHistoryClick}
          isAdmin={isAdmin}
        />
      </Col>
    </Row>
  );
};

export default ViewArticle;
