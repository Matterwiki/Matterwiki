import React from "react";
import Alert from "react-s-alert";
import { Grid, Row, Col } from "react-bootstrap";

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
    <Grid fluid>
      <Row>
        <Col md={9}>
          <ArticleHeading date={article.updated_at}>{article.title}</ArticleHeading>
          <div className="single-article-body">
            <WikiEditor readOnly rawContent={JSON.parse(article.content)} />
          </div>
        </Col>
        <Col md={3}>
          <ArticleSidebar
            article={article}
            onEditClick={handleEditClick}
            onDeleteClick={handleDeleteClick}
            onHistoryClick={handleHistoryClick}
            isAdmin={isAdmin}
          />
        </Col>
      </Row>
    </Grid>
  );
};

export default ViewArticle;
