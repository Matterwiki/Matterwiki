import React from "react";
import { hashHistory } from "react-router";
import Alert from "react-s-alert";

import { Grid, Row, Col } from "react-bootstrap";
import LoginForm from "./LoginForm";

import API from "api/wrapper.js";

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
    for (var f in user) {
      user[f] = encodeURIComponent(user[f]);
    }

    API.call("authenticate", "POST", "", user)
      .then(function(loggedInUser) {
        window.localStorage.setItem("userToken", loggedInUser.data.token);
        window.localStorage.setItem("userId", loggedInUser.data.user.id);

        // TODO some weird `.`s going on here.
        // The API Wrapper should have to take care of this and just return data
        window.localStorage.setItem("userEmail", loggedInUser.data.user.token);

        hashHistory.push("home");

        Alert.success("You are now logged in");
      })
      .catch(function(err) {
        Alert.error(err.error.message);
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
