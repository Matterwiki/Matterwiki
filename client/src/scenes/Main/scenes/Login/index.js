import React from "react";
import { hashHistory } from "react-router";
import Alert from "react-s-alert";
import { Grid, Row, Col } from "react-bootstrap";

import LoginForm from "./components/LoginForm";

import APIProvider from "utils/APIProvider";

import './Login.css';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this._handleSubmit.bind(this);
  }

  componentDidMount() {
    if (window.localStorage.getItem("userToken")) {
      hashHistory.push("home");
    }
  }

  _handleSubmit(user) {
    APIProvider.post("authenticate", user)
      .then(function(loggedInUser) {
        window.localStorage.setItem("userToken", loggedInUser.token);
        window.localStorage.setItem("userId", loggedInUser.user.id);
        window.localStorage.setItem("userEmail", loggedInUser.user.email);

        hashHistory.push("home");

        Alert.success("You are now logged in");
      })
      .catch(function(err) {
        Alert.error(err.message);
      });
  }

  render() {
    return (
      <Grid bsClass="login-box">
        <Col md={12}>
          <LoginForm onSubmit={this.handleSubmit} />
        </Col>
      </Grid>
    );
  }
}

export default Login;
