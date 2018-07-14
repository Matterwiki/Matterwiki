import React from "react";

import NoArticles from "assets/noarticles.svg";
import { Flex } from "ui/utils";

const NoArticlesFound = () => (
  <Flex justifyContent="center" alignItems="center" flexDirection="column">
    <img src={NoArticles} alt="No articles found" />
    <h3>No articles under this category</h3>
  </Flex>
);

export default NoArticlesFound;
