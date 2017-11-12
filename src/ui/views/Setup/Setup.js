import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Col } from "reactstrap";

import { Emoji } from "emoji-mart";

import Logo from "../../shared/components/Logo/Logo";
import SetupForm from "./SetupForm";

import "./Setup.css";

const Setup = ({ onRegisterClick }) => (
  <Container>
    <Logo />
    <Row className="setup-container">
      <Col sm={6} md={6}>
        <h2>
          Hey there <Emoji emoji="v" size={48} />
        </h2>
        <h4>Matterwiki is a simple wiki for teams.</h4>
        <br />
        <h5>
          People use it to store documentation, notes, culture guidelines,
          employee onboarding content and everything they want to.
        </h5>
        <br />
      </Col>
      <Col sm={6} md={6}>
        <SetupForm onSubmit={onRegisterClick} />
      </Col>
    </Row>
  </Container>
);

Setup.propTypes = {
  onRegisterClick: PropTypes.func.isRequired
};

export default Setup;
