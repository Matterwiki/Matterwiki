import React from "react";
import { Container } from "ui";
import Header from "./components/Header/Header";
import Footer from "./components/Footer";

const Layout = ({ children, ...props }) => (
  <React.Fragment>
    <Header {...props} />
    <Container minHeight="80vh">{children}</Container>
    <Footer />
  </React.Fragment>
);

export default Layout;
