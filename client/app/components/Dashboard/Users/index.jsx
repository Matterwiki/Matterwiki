import React from 'react';
import {hashHistory, Link} from 'react-router';

import Alert from 'react-s-alert';
import Loader from 'Loader/index';

import ListUsers from './list_users.jsx';
import AddUser from './add_user.jsx';

import API from 'api/wrapper.js';

class Users extends React.Component {

  constructor(props) {

    super(props);

    this.addUser = this.addUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.state = { loading: true, users: [], loading_users: true }

  }


  handleUpdate() {
    /*

    This function sends a request to the users endpoint then
    updates the component state with the list of all users

    */
    var that = this;
    this.setState({ loading_users: true })
    API.call("users","GET",window.localStorage.getItem('userToken'))
    .then(function(users){
          that.setState({ users: users.data, loading_users: false, loading: false })
      }).catch(function(err){
        //Alert.error(err);
    })
  }

  componentDidMount() {
    /*

    Whenever the component mounts we update the users list

    */
    this.handleUpdate();
  }

  deleteUser(id) {

    /*

    This function takes the ID of the user to be deleted.
    Then sends a DELETE request to the API.
    On a successful request it calls the update function to update the list.

    */

    var that = this;

    var del = confirm("Deleting the user will move all of his/her articles to the Admin. Are you sure?");

    if(del==true) {
      API.call("users?id="+id,"DELETE",window.localStorage.getItem('userToken'))
      .then(function(user){

        Alert.success('User has been deleted');
        that.handleUpdate();

      })
      .catch(function(err){

        //Alert.error(err);

      });
    }

  }

  addUser(user) {

    /*

    This function takes the user object.
      The user object should have two keys, name and description.
    It then sends a POST request to the API.
    On a successful request it calls the update function to update the list.

    */

    var that = this;

    API.call("users","POST",window.localStorage.getItem("userToken"),user)
    .then(function(user){

      Alert.success('User has been added');
      that.handleUpdate();

    })
    .catch(function(err){

      //Alert.error(err);

    });
  }


  render () {

    if(this.state.loading)

      return <Loader />

    else

      return(
        <div className="users">
          <div className="col-sm-12 col-md-4">
            <AddUser addUser={this.addUser} />
          </div>
          <div className="col-sm-12 col-md-8">
            <ListUsers users={this.state.users} deleteUser={this.deleteUser} />
          </div>
        </div>
      );
  }

}

export default Users;
