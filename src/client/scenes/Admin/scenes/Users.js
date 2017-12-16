import React from "react";
import { Row, Col } from "ui";
import Alert from "react-s-alert";

import Loader from "components/Loader/Loader";
import APIProvider from "utils/APIProvider";

import { connect } from "react-redux";

import store from "state/store";
import {
  loadUsersPage,
  disposeUsersPage,
  loadEditUser,
  disposeEditUser
} from "state/actions/sagaActions";

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
    store.dispatch(disposeUsersPage());
  }

  handleUpdate = () => {
    store.dispatch(loadUsersPage());
  };

  handleEditClick = id => {
    store.dispatch(loadEditUser(id));
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
      store.dispatch(disposeEditUser());
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
    store.dispatch(disposeEditUser());
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
      <Row>
        <Col width="25">
          <ItemForm
            itemFormFields={itemFormFields}
            item={currentUser}
            itemName="user"
            onSubmit={onSubmit}
            onCancelUpdate={this.emptyCurrentUserState}
          />
        </Col>
        <Col>
          <ItemList
            items={users}
            itemName="user"
            onDeleteClick={this.deleteUser}
            onEditClick={this.handleEditClick}
          />
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = state => ({
  users: state.users.users,
  loading: state.users.loading,
  currentUser: state.users.currentUser
});

export default connect(mapStateToProps)(ManageUsers);
