import React from "react";
import { HelpBlock, Col, Row } from "ui";
import { Flex } from "ui/utils";
import PageNotFound from "assets/404.svg";

const NotFoundError = () => (
  <React.Fragment>
    <Flex flexDirection="column" justifyContent="center" alignItems="center">
      <img src={PageNotFound} alt="Page not found" />
      <h1>404</h1>
      <h3>Page not found</h3>
    </Flex>
  </React.Fragment>
);

export default NotFoundError;
