import React from "react";
import { hashHistory } from "react-router";
import Alert from "react-s-alert";
import { Grid, Row, Col } from "react-bootstrap";
import UserForm from "./UserForm";
import Loader from "Loader/index";

import API from "api/wrapper.js";

class EditUser extends React.Component {
  constructor(props) {
    super(props);
    this.editUser = this.editUser.bind(this);
    this.state = {
      user: null
    };
  }

  componentDidMount() {
    this.setState({
      loading: true
    });
    API.call(
      `users/${this.props.params.userId}`,
      "GET",
      window.localStorage.getItem("userToken")
    ).then(user => {
      this.setState({
        user: user.data,
        loading: false
      });
    });
  }

  editUser(user) {
    var user = {
      name: encodeURIComponent(user.name),
      about: encodeURIComponent(user.about),
      email: encodeURIComponent(user.email),
      password: encodeURIComponent(user.password),
      id: encodeURIComponent(this.props.params.userId)
    };
    API.call(
      "users",
      "PUT",
      window.localStorage.getItem("userToken"),
      user
    ).then(user => {
      Alert.success("User has been edited");
      hashHistory.push("admin");
    });
  }

  render() {
    if (this.state.loading) return <Loader />;
    else
      return (
        <Grid>
          <Row>
            <Col md={12} sm={12}>
              <h1><b>Update User</b></h1>
              <br />
              <UserForm user={this.state.user} onSubmit={this.editUser} />
            </Col>
          </Row>
        </Grid>
      );
  }
}

export default EditUser;
