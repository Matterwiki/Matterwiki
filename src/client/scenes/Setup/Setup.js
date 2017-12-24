import React from "react";
import Alert from "react-s-alert";
import { Row, Col } from "ui";
// import services
import APIProvider from "utils/APIProvider";

// import needed components
import SetupForm from "./components/SetupForm";

class Setup extends React.Component {
  handleSignUp = user => {
    APIProvider.post("setup", user)
      .then(() => {
        Alert.success("Admin user generated");
        this.props.history.push("/login");
      })
      .catch(err => {
        Alert.error(err.message);
      });
  };

  render() {
    return (
      <Row>
        <Col>
          <h1>
            <b>Welcome,</b>
          </h1>
          <h3>Matterwiki is a simple wiki for teams</h3>
          <br />
          <h4>
            People use it to store documentation, notes, culture guidelines, employee onboarding
            content and everything they want to.
          </h4>
          <br />
        </Col>
        <Col>
          <SetupForm onSubmit={this.handleSignUp} />
        </Col>
      </Row>
    );
  }
}

export default Setup;
