import React from "react";
import Header from "./components/Header/index";
import Container from "./components/Container";
import Footer from "./components/Footer";

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
