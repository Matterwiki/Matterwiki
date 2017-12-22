import React from "react";
import Header from "./components/Header/Header";
import Container from "./components/Container";
import Footer from "./components/Footer";

import "./Layout.css";

const Layout = ({ children, ...props }) => (
  <div>
    <Header {...props} />
    <Container>{children}</Container>
    <Footer />
  </div>
);

export default Layout;
