import React from "react";
import { HelpBlock, Grid, Col, Row } from "react-bootstrap";

import "./Errors.css";

const NotFoundError = () => (
  <Grid bsClass="error-container">
    <Row>
      <Col md={12}>
        <h2>Page not found</h2>
        <br />
        <HelpBlock>
          The page you are looking for does not exist.<br />
          If you think it should, please contact your Matterwiki Admin.
        </HelpBlock>
      </Col>
    </Row>
  </Grid>
);

export default NotFoundError;
