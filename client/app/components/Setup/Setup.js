import React from "react";
import { hashHistory } from "react-router";
import Loader from "Loader/index";
import Alert from "react-s-alert";

import { Grid, Row, Col } from "react-bootstrap";

import SetupForm from "./SetupForm";

import APIProvider from "utils/APIProvider";

class Setup extends React.Component {
  constructor(...args) {
    super(...args);
    this.handleSignUp = this._handleSignUp.bind(this);
  }

  _handleSignUp(user) {
    APIProvider.post("setup", user)
      .then(function(user) {
        Alert.success("Admin user generated");
        hashHistory.push("login");
      })
      .catch(function(err) {
        Alert.error(err);
      });
  }

  render() {
    return (
      <Grid bsClass="setup-container">
        <Row>
          <Col md={6}>
            <h1><b>Welcome,</b></h1>
            <h3>Matterwiki is a simple wiki for teams</h3><br />
            <h4>
              People use it to store documentation, notes, culture guidelines, employee onboarding content
              and everything they want to.
            </h4><br />
          </Col>
          <Col md={6}>
            <SetupForm onSubmit={this.handleSignUp} />
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default Setup;
