import React from 'react';
import {hashHistory, Link} from 'react-router';
import Alert from 'react-s-alert';
import Loader from './loader.jsx';
import LogoUpload from './logo_upload.jsx';

import MatterwikiAPI from '../../../api/MatterwikiAPI.js';

class Admin extends React.Component {

  constructor(props) {
    super(props);
    this.addUser = this.addUser.bind(this);
    this.addTopic = this.addTopic.bind(this);
    this.deleteTopic = this.deleteTopic.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.state = {loading: true, users: [], topics: [], error: ""}
  }

  componentDidMount() {
    var that = this;
    MatterwikiAPI.call("topics","GET",window.localStorage.getItem('userToken'))
    .then(function(topics){
      MatterwikiAPI.call("users","GET",window.localStorage.getItem('userToken'))
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
    MatterwikiAPI.call("users","POST",window.localStorage.getItem("userToken"),user)
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

  addTopic(e) {
    e.preventDefault();
    var topic = {
      name: encodeURIComponent(this.refs.topic_name.value),
      description: encodeURIComponent(this.refs.topic_description.value)
    };
    var that = this;
    MatterwikiAPI.call("topics","POST",window.localStorage.getItem("userToken"),topic)
    .then(function(topic){
      $('#addTopic').modal('hide');
      var topics = that.state.topics;
      topics.push(topic.data);
      that.setState({topics: topics});
      Alert.success('Topic has been added');
    })
    .catch(function(err){
      $('#addTopic').modal('hide');
      //Alert.error(err);
    });
  }

  deleteTopic(id,e) {
    e.preventDefault();
    var that = this;
    MatterwikiAPI.call("topics?id="+id,"DELETE",window.localStorage.getItem('userToken'))
    .then(function(topic){
      topics = that.state.topics
      var topics = $.grep(topics, function(e){
         return e.id != id;
      });
      that.setState({topics: topics});
      Alert.success('Topic has been deleted');
    }).catch(function(err){
      //Alert.error(err);
    });
  }


  deleteUser(id,e) {
    e.preventDefault();
    var del = confirm("Deleting the user will move all of his/her articles to the Admin. Are you sure?");
    if(del==true) {
        var that = this;
        MatterwikiAPI.call("users?id="+id,"DELETE",window.localStorage.getItem("userToken"))
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
     console.log(this.state);
    if(this.state.loading)
      return <Loader />
    else
        return(
          <div>
            <div className="row container">
          <div className="col-md-6">
            <button className="btn btn-default" data-toggle="modal" data-target="#addTopic">Add Topic</button>
            <br/>
            <br/>
              <div className="list-group bordered-scroll-box">
                  {this.state.topics.map(topic => (
                    <div key={topic.id} href="#" className="list-group-item">
                      {(topic.id !== 1)? <span className="pull-right">
                      <Link to={'topic/edit/'+topic.id} className="btn btn-default">Edit</Link>
                      <button className="btn btn-default" type="button" onClick={(e) => this.deleteTopic(topic.id,e)}>Delete</button>
                      </span>: ''}
                      <h4 className="list-group-item-heading">{decodeURIComponent(topic.name)}</h4>
                      <p className="list-group-item-text">{decodeURIComponent(topic.description)}</p>
                    </div>
                ))}</div>
          </div>
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


          <div className="modal modal-fullscreen fade" id="addTopic" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                </div>
                <div className="modal-body">
                  <center>
                  <div className="row">

                    <div className="col-md-6 col-sd-12">
                      <h1><b>Add Topic</b></h1>
                      <br/>
                        <form>
                          <div className="col-sm-12 form-group">
                            <input type="text" className="form-control" ref="topic_name" id="inputTopicName" placeholder="Name" />
                          </div>
                          <div className="col-sm-12 form-group">
                            <input type="text" className="form-control" ref="topic_description" id="inputTopicAbout" placeholder="Description" />
                          </div>
                      <div className="col-sm-12 form-group">
                        <button onClick={this.addTopic} className="btn btn-default btn-block btn-lg">Add Topic</button>
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
