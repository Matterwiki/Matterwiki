import React from "react";
import Header from "./Header/index";
import Container from "./Container";
import Footer from "./Footer";

import "./Layout.css";

const Layout = props => (
  <div>
    <Header {...props} />
    <Container>
      {props.children}
    </Container>
    <Footer />
  </div>
);

export default Layout;
