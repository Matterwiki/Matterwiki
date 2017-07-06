import React from "react";
import { Grid, Row, Col, HelpBlock } from "react-bootstrap";

import ArticleHeading from "./ArticleHeading";
import WikiEditor from "./WikiEditor/WikiEditor";

const SimpleArticle = ({ loading, article }) => {
  if (loading) return <Loader />;
  if (article && article.user) {
    const rawContent = JSON.parse(article.body);
    return (
      <Grid fluid={true}>
        <Row>
          <Col md={12}>
            <ArticleHeading editedBy={article.user.name}>
              {article.title}
            </ArticleHeading>
            <div className="single-article-body">
              <WikiEditor readOnly={true} rawContent={rawContent} />
            </div>
          </Col>
        </Row>
      </Grid>
    );
  } else {
    return (
      <center>
        <HelpBlock>Please select an archive</HelpBlock>
      </center>
    );
  }
};

export default SimpleArticle;
