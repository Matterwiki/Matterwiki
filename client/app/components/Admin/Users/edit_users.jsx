import React from 'react';
import {hashHistory} from 'react-router';
import Alert from 'react-s-alert';
import Loader from 'Loader/index';

import API from 'api/wrapper.js';

class EditUser extends React.Component {

  constructor(props) {
    super(props);
    this.editUser = this.editUser.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {loading: true, name: "", about: "", email: "", password: ""}
  }

  handleChange() {
    this.setState({name: this.refs.user_name.value, about: this.refs.user_about.value, email: this.refs.user_email.value, password: this.refs.user_password.value});
  }

  componentDidMount() {
    var that = this;
    API.call("users/"+this.props.params.userId,"GET",window.localStorage.getItem('userToken'))
    .then(function(user){
        that.setState({
          name: decodeURIComponent(user.data.name),
          about: decodeURIComponent(user.data.about),
          email: decodeURIComponent(user.data.email),
          loading: false})
    })
    .catch(function(err){
        //Alert.error(err);
    })
  }

  editUser(e) {
    var that = this;
    var user = {
      name: encodeURIComponent(this.refs.user_name.value),
      about: encodeURIComponent(this.refs.user_about.value),
      email: encodeURIComponent(this.refs.user_email.value),
      password: encodeURIComponent(this.refs.user_password.value),
      id: encodeURIComponent(this.props.params.userId)
    };
    API.call("users","PUT",window.localStorage.getItem('userToken'),user)
    .then(function(user){
        Alert.success('User has been edited');
        hashHistory.push('admin');
    })
    .catch(function(err){
        //Alert.error(err);
    })
  }


  render () {
    if(this.state.loading)
      return <Loader />
    else
        return(
          <div>
                  <div className="row">
                    <div className="col-md-12 col-sd-12">
                      <h1><b>Update User</b></h1>
                      <br/>
                        <form>
                          <div className="col-sm-12 form-group">
                            <input type="text" className="form-control" ref="user_name" id="inputUserName" placeholder="Name" value={this.state.name} onChange={this.handleChange} />
                          </div>
                          <div className="col-sm-12 form-group">
                            <input type="text" className="form-control" ref="user_about" id="inputUserAbout" placeholder="About" value={this.state.about} onChange={this.handleChange}/>
                          </div>
                          <div className="col-sm-12 form-group">
                            <input type="text" className="form-control" ref="user_email" id="inputUserName" placeholder="Email" value={this.state.email} onChange={this.handleChange} />
                          </div>
                          <div className="col-sm-12 form-group">
                            <input type="password" className="form-control" ref="user_password" id="inputUserName" placeholder="Password" value={this.state.password} onChange={this.handleChange} />
                          </div>
                      <div className="col-sm-12 form-group">
                        <button onClick={this.editUser} className="btn btn-default btn-block ">Update User</button>
                      </div>
                    </form>
                    </div>
                  </div>
                </div>);
  }
}

export default EditUser;
