import React from "react";
import { Grid, Row, Col, HelpBlock } from "react-bootstrap";

import ArticleHeading from "./ArticleHeading";
import WikiEditor from "WikiEditor/index.jsx";

const SimpleArticle = props => {
  if (props.loading) return <Loader />;
  if (props.article && props.article.user) {
    const rawContent = JSON.parse(decodeURIComponent(props.article.body));
    return (
      <Grid fluid={true}>
        <Row>
          <Col md={12}>
            <ArticleHeading editedBy={props.article.user.name}>
              {decodeURIComponent(props.article.title)}
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
