import React from "react";
import { hashHistory, Link } from "react-router";
import { Grid, Row, Col } from "react-bootstrap";
import Alert from "react-s-alert";

import Loader from "components/Loader/index";
import ItemList from "../components/ItemList";
import ItemForm from "../components/ItemForm";

import APIProvider from "utils/APIProvider";

// TODO move these fellas to a nice consts file
const USER_FORM_FIELDS = [
  { name: "name", type: "text" },
  { name: "about", type: "text" },
  { name: "email", type: "email" },
  { name: "password", type: "password" }
];

const EDIT_USER_FORM_FIELDS = [
  { name: "name", type: "text" },
  { name: "about", type: "text" },
  { name: "email", type: "email" }
];

class ManageUsers extends React.Component {
  constructor(...args) {
    super(...args);

    this.addUser = this.addUser.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);

    this.state = {
      users: [],
      currentUser: null
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

  handleEditClick(id) {
    APIProvider.get(`users/${id}`).then(currentUser => {
      this.setState({
        currentUser
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

  updateUser(user) {
    user.id = this.state.currentUser.id;
    APIProvider.put("users", user).then(user => {
      Alert.success("User has been edited");
      this.setState({
        currentUser: null
      });
      this.handleUpdate();
    });
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
      const onSubmit = this.state.currentUser ? this.updateUser : this.addUser;
      const itemFormFields = this.state.currentUser
        ? EDIT_USER_FORM_FIELDS
        : USER_FORM_FIELDS;
      return (
        <Grid>
          <Row>
            <Col sm={12} md={4}>
              <Row>
                <Col md={12} sm={12}>
                  <ItemForm
                    itemFormFields={itemFormFields}
                    item={this.state.currentUser}
                    itemName="user"
                    onSubmit={onSubmit}
                  />
                </Col>
              </Row>
            </Col>
            <Col sm={12} md={8}>
              <ItemList
                items={this.state.users}
                itemName="user"
                onDeleteClick={this.deleteUser}
                onEditClick={this.handleEditClick}
              />
            </Col>
          </Row>
        </Grid>
      );
    }
  }
}

export default ManageUsers;
