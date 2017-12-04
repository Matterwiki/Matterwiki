import React from "react";
import { Grid, Row, Col } from "react-bootstrap";
import Alert from "react-s-alert";

import Loader from "components/Loader/Loader";
import APIProvider from "utils/APIProvider";

import { connect } from "react-redux";
import {
  addUsers,
  emptyUsers,
  startLoading,
  stopLoading,
  setCurrentUser,
  emptyCurrentUser
} from "state/actions/user";
import store from "state/store";

import ItemList from "../components/ItemList";
import ItemForm from "../components/ItemForm";

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

// TODO MangeUsers and ManageTopics are basically the same with different endpoints. Abstract!
class ManageUsers extends React.Component {
  componentDidMount() {
    this.handleUpdate();
  }

  componentWillUnmount() {
    store.dispatch(emptyUsers());
  }

  handleUpdate = () => {
    store.dispatch(startLoading());
    APIProvider.get("users").then(users => {
      store.dispatch(addUsers(users));
      store.dispatch(stopLoading());
    });
  };

  handleEditClick = id => {
    APIProvider.get(`users/${id}`).then(currentUser => {
      store.dispatch(setCurrentUser(currentUser));
    });
  };

  deleteUser = id => {
    const canDelete = confirm(
      "Deleting the user will move all of his/her articles to the Admin. Are you sure?"
    );

    if (canDelete) {
      APIProvider.delete(`users/${id}`).then(() => {
        Alert.success("User has been deleted");
        this.handleUpdate();
      });
    }
  };

  updateUser = user => {
    const id = this.state.currentUser.id;
    APIProvider.put(`users/${id}`, user).then(() => {
      Alert.success("User has been edited");
      store.dispatch(emptyCurrentUser());
      this.handleUpdate();
    });
  };

  addUser = user => {
    APIProvider.post("users", user).then(() => {
      Alert.success("User has been added");
      this.handleUpdate();
    });
  };

  emptyCurrentUserState = () => {
    store.dispatch(emptyCurrentUser());
  };

  render() {
    const { users: { users, loading, currentUser } } = store.getState();
    if (loading) {
      return <Loader />;
    }

    const onSubmit = currentUser ? this.updateUser : this.addUser;
    const itemFormFields = currentUser
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
                  item={currentUser}
                  itemName="user"
                  onSubmit={onSubmit}
                  onCancelUpdate={this.emptyCurrentUserState}
                />
              </Col>
            </Row>
          </Col>
          <Col sm={12} md={8}>
            <ItemList
              items={users}
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

const mapStateToProps = state => ({
  users: state.users.users,
  loading: state.users.loading,
  currentUser: state.users.currentUser
});

export default connect(mapStateToProps)(ManageUsers);
