import React from "react";
import { HelpBlock } from "react-bootstrap";
import { Row, Col } from "ui";
import Loader from "components/Loader/Loader";

import ArticleHeading from "./ArticleHeading";
import WikiEditor from "./WikiEditor/WikiEditor";

const SimpleArticle = ({ loading, article }) => {
  if (loading) {
    return <Loader />;
  }
  if (article && article.title) {
    const rawContent = JSON.parse(article.content);
    return (
      <Row>
        <Col>
          <ArticleHeading editedBy={article.createdUser.name}>
            {article.title}
          </ArticleHeading>
          <WikiEditor readOnly rawContent={rawContent} />
        </Col>
      </Row>
    );
  }
  return (
    <center>
      <HelpBlock>Please select an archive</HelpBlock>
    </center>
  );
};

export default SimpleArticle;
