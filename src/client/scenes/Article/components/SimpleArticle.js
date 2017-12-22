import React from "react";
import { Grid, Row, Col, HelpBlock } from "react-bootstrap";
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
      <Grid fluid>
        <Row>
          <Col md={12}>
            <ArticleHeading editedBy={article.createdByUser.name}>{article.title}</ArticleHeading>
            <div className="single-article-body">
              <WikiEditor readOnly rawContent={rawContent} />
            </div>
          </Col>
        </Row>
      </Grid>
    );
  }
  return (
    <center>
      <HelpBlock>Please select an archive</HelpBlock>
    </center>
  );
};

export default SimpleArticle;
