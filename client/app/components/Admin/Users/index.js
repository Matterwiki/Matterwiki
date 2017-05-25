import React from "react";
import { hashHistory, Link } from "react-router";
import { Grid, Row, Col } from "react-bootstrap";
import Loader from "Loader/index";
import Alert from "react-s-alert";

import UsersList from "./UsersList";
import UserForm from "./UserForm";

import APIProvider from "utils/APIProvider";

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
    APIProvider.get("users").then(users => {
      this.setState({
        users,
        loading: false
      });
    });
  }

  componentDidMount() {
    this.handleUpdate();
  }

  deleteUser(id) {
    const canDelete = confirm(
      "Deleting the user will move all of his/her articles to the Admin. Are you sure?"
    );

    if (canDelete) {
      APIProvider.delete(`users?id=${id}`).then(a => {
        Alert.success("User has been deleted");
        this.handleUpdate();
      });
    }
  }

  addUser(user) {
    APIProvider.post("users", user).then(user => {
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
