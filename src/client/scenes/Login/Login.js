import React from "react";
import Alert from "react-s-alert";

import { Row, Col } from "ui";

import APIProvider from "utils/APIProvider";

import LoginForm from "./components/LoginForm";

class Login extends React.Component {
  componentDidMount() {
    if (window.localStorage.getItem("userToken")) {
      this.props.history.push("home");
    }
  }

  handleSubmit = user => {
    APIProvider.post("auth/login", user)
      .then(loggedInUser => {
        window.localStorage.setItem("userToken", loggedInUser.token);
        window.localStorage.setItem("userId", loggedInUser.id);
        window.localStorage.setItem("userEmail", loggedInUser.email);

        this.props.history.push("home");

        Alert.success("You are now logged in");
      })
      .catch(err => {
        Alert.error(err.message);
      });
  };

  render() {
    return (
      <Row>
        <Col>
          <LoginForm onSubmit={this.handleSubmit} />
        </Col>
      </Row>
    );
  }
}

export default Login;
