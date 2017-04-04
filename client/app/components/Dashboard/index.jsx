import React from 'react';
import {hashHistory, Link} from 'react-router';
import Alert from 'react-s-alert';
import Loader from 'Loader/loader.jsx';
import LogoUpload from './logo_upload.jsx';

import Topics from './Topics/index.jsx';

import API from 'api/wrapper.js';

class Admin extends React.Component {

  constructor(props) {
    super(props);
    this.addUser = this.addUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.state = {loading: true, users: [], topics: [], error: ""}
  }

  componentDidMount() {
    var that = this;
    API.call("topics","GET",window.localStorage.getItem('userToken'))
    .then(function(topics){
      API.call("users","GET",window.localStorage.getItem('userToken'))
      .then(function(users){
        that.setState({topics: topics.data, users: users.data, loading: false})
      }).catch(function(err){
        //Alert.error(err);
      }).catch(function(err){
        //Alert.error(err);
      })
    })
  }

  addUser(e) {
    e.preventDefault();
    var user = {
      name: encodeURIComponent(this.refs.user_name.value),
      about: encodeURIComponent(this.refs.user_about.value),
      email: encodeURIComponent(this.refs.user_email.value),
      password: encodeURIComponent(this.refs.user_password.value)
    };
    var that = this;
    API.call("users","POST",window.localStorage.getItem("userToken"),user)
    .then(function(user){
        $('#addUser').modal('hide');
        var users = that.state.users;
        users.push(user.data);
        that.setState({users: users});
        Alert.success('User has been added');
    })
    .catch(function(err){
      //Alert.error(err);
    })
  }


  deleteUser(id,e) {
    e.preventDefault();
    var del = confirm("Deleting the user will move all of his/her articles to the Admin. Are you sure?");
    if(del==true) {
        var that = this;
        API.call("users?id="+id,"DELETE",window.localStorage.getItem("userToken"))
        .then(function(user){
          users = that.state.users
          var users = $.grep(users, function(e){
             return e.id != id;
          });
          that.setState({users: users});
          Alert.success('User has been deleted');
        })
    }
  }


  render () {

    if(this.state.loading)

      return <Loader />

    else
        return(
          <div>
            <div className="row container">
          <Topics />
          <div className="col-md-6">
            <button className="btn btn-default" data-toggle="modal" data-target="#addUser">Add User</button>
            <br/>
            <br/>
            <div className="list-group bordered-scroll-box">
                  {this.state.users.map(user => (
                    <div key={user.id} href="#" className="list-group-item">
                      {(user.id!=1) ? <span className="pull-right">
                        <Link to={'user/edit/'+user.id} className="btn btn-default">Edit</Link>
                        <button className="btn btn-default" type="button"onClick={(e) => this.deleteUser(user.id,e)}>Delete</button>
                      </span> : ''}
                      <h4 className="list-group-item-heading">{decodeURIComponent(user.name)}</h4>
                      <p className="list-group-item-text">{decodeURIComponent(user.about)}</p>
                    </div>
                ))}</div>
          </div>
          </div>

          <div className="modal modal-fullscreen fade" id="addUser" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                </div>
                <div className="modal-body">
                  <center>
                  <div className="row">

                    <div className="col-md-6 col-sd-12">
                      <h1><b>Add User</b></h1>
                      <br/>
                        <form>
                          <div className="col-sm-12 form-group">
                            <input type="text" className="form-control" ref="user_name" id="inputUserName" placeholder="Name" />
                          </div>
                          <div className="col-sm-12 form-group">
                            <input type="text" className="form-control" ref="user_about" id="inputUserAbout" placeholder="About" />
                          </div>
                      <div className="col-sm-12 form-group">
                        <input type="email" className="form-control" ref="user_email" id="inputUserEmail" placeholder="Email" />
                      </div>
                      <div className="col-sm-12 form-group">
                        <input type="password" className="form-control" ref="user_password" id="inputUserPassword" placeholder="Password" />
                      </div>
                      <div className="col-sm-12 form-group">
                        <button onClick={this.addUser} className="btn btn-default btn-block btn-lg">Add User</button>
                      </div>
                    </form>
                    </div>
                  </div>
                </center>
                </div>

              </div>
            </div>
          </div>
          <LogoUpload />
        </div>);
  }
}

export default Admin;
