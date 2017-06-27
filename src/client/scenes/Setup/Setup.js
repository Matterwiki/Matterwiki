import React from "react";
// import { hashHistory } from "react-router";
import Alert from "react-s-alert";
import { Grid, Row, Col } from "react-bootstrap";

// import needed components
import SetupForm from "./components/SetupForm";

// import services
import APIProvider from "utils/APIProvider";

// import CSS
import "./Setup.css";

class Setup extends React.Component {
  handleSignUp = user => {
    APIProvider.post("setup", user)
      .then(function(user) {
        Alert.success("Admin user generated");
        // hashHistory.push("login");
      })
      .catch(function(err) {
        Alert.error(err);
      });
  };

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
