import React from "react";
import { hashHistory, Link } from "react-router";
import { Grid, Row, Col } from "react-bootstrap";
import Loader from "Loader/index";
import Alert from "react-s-alert";

import UsersList from "./UsersList";
import UserForm from "./UserForm";

import API from "api/wrapper.js";

class Users extends React.Component {
  constructor(...args) {
    super(...args);

    this.addUser = this.addUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);

    this.state = {
      users: []
    };
  }

  handleUpdate() {
    this.setState({
      loading: true
    });
    API.call(
      "users",
      "GET",
      window.localStorage.getItem("userToken")
    ).then(users => {
      this.setState({
        users: users.data,
        loading: false
      });
    });
  }

  componentDidMount() {
    this.handleUpdate();
  }

  deleteUser(id) {
    const deleteText =
      "Deleting the user will move all of his/her articles to the Admin. Are you sure?";

    if (confirm(deleteText)) {
      API.call(
        "users?id=" + id,
        "DELETE",
        window.localStorage.getItem("userToken")
      ).then(user => {
        Alert.success("User has been deleted");
        this.handleUpdate();
      });
    }
  }

  addUser(user) {
    API.call(
      "users",
      "POST",
      window.localStorage.getItem("userToken"),
      user
    ).then(user => {
      Alert.success("User has been added");
      this.handleUpdate();
    });
  }

  render() {
    if (this.state.loading) return <Loader />;
    else {
      return (
        <Grid>
          <Row className="users">
            <Col sm={12} md={4}>
              <Row>
                <Col md={12} sm={12}>
                  <UserForm onSubmit={this.addUser} />
                </Col>
              </Row>
            </Col>
            <br /><br />
            <Col sm={12} md={8}>
              <UsersList
                users={this.state.users}
                onDeleteClick={this.deleteUser}
              />
            </Col>
          </Row>
        </Grid>
      );
    }
  }
}

export default Users;
