import React from 'react';
import {hashHistory} from 'react-router';

class Admin extends React.Component {

  constructor(props) {
    super(props);
    this.addUser = this.addUser.bind(this);
    this.addTopic = this.addTopic.bind(this);
    this.state = {users: [], topics: [], error: ""}
  }

  componentDidMount() {
    var myHeaders = new Headers({
        "Content-Type": "application/x-www-form-urlencoded",
        "x-access-token": localStorage.getItem('userToken')
    });
    var myInit = { method: 'GET',
               headers: myHeaders,
               };
    var that = this;
    fetch('/api/topics',myInit)
    .then(function(response) {
      console.log(response);
      return response.json();
    })
    .then(function(response) {
      if(response.error.error)
        that.setState({error: response.error.message})
      else {
        that.setState({topics: response.data})
        console.log(that.state.topics);
      }
      console.log(response);
    });

    fetch('/api/users',myInit)
    .then(function(response) {
      console.log(response);
      return response.json();
    })
    .then(function(response) {
      if(response.error.error)
        that.setState({error: response.error.message})
      else {
        that.setState({users: response.data})
        console.log(that.state.users);
      }
      console.log(response);
    });

  }

  addUser(e) {
    var user = {
      name: this.refs.user_name.value,
      about: this.refs.user_about.value,
      email: this.refs.user_email.value,
      password: this.refs.user_password.value
    };
    console.log(user);
    var myHeaders = new Headers({
        "Content-Type": "application/x-www-form-urlencoded",
        "x-access-token": localStorage.getItem('userToken')
    });
    var myInit = { method: 'POST',
               headers: myHeaders,
               body: "name="+user.name+"&about="+user.about+"&email="+user.email+"&password="+user.password
               };
    var that = this;
    fetch('/api/users/',myInit)
    .then(function(response) {
      console.log(response);
      return response.json();
    })
    .then(function(response) {
      if(response.error.error)
        that.setState({error: response.error.message})
      else {
          $('#addUser').modal('hide');
          var users = that.state.users;
          users.push(response.data);
          console.log(response.data);
          that.setState({users: users});
      }
    });
  }

  addTopic(e) {
    var topic = {
      name: this.refs.topic_name.value,
      description: this.refs.topic_description.value
    };
    console.log(topic);
    var myHeaders = new Headers({
        "Content-Type": "application/x-www-form-urlencoded",
        "x-access-token": localStorage.getItem('userToken')
    });
    var myInit = { method: 'POST',
               headers: myHeaders,
               body: "name="+topic.name+"&description="+topic.description
               };
    var that = this;
    fetch('/api/topics/',myInit)
    .then(function(response) {
      console.log(response);
      return response.json();
    })
    .then(function(response) {
      if(response.error.error)
        that.setState({error: response.error.message})
      else {
          $('#addTopic').modal('hide');
          var topics = that.state.topics;
          topics.push(response.data);
          that.setState({topics: topics});
      }
    });
  }

  render () {
    return(
      <div>
        <div className="row container">
      <div className="col-md-6">
        <button className="btn btn-default" data-toggle="modal" data-target="#addTopic">Add Topic</button>
        <br/>
        <br/>
          <div className="list-group bordered-scroll-box">
              {this.state.topics.map(topic => (
                <a key={topic.id} href="#" className="list-group-item">
                  <h4 className="list-group-item-heading">{topic.name}</h4>
                  <p className="list-group-item-text">{topic.description}</p>
                </a>
            ))}</div>
      </div>
      <div className="col-md-6">
        <button className="btn btn-default" data-toggle="modal" data-target="#addUser">Add User</button>
        <br/>
        <br/>
        <div className="list-group bordered-scroll-box">
              {this.state.users.map(user => (
                <a key={user.id} href="#" className="list-group-item">
                  <h4 className="list-group-item-heading">{user.name}</h4>
                  <p className="list-group-item-text">{user.about}</p>
                </a>
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

    </div>);
  }
}

export default Admin;
