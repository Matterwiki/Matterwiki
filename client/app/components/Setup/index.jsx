import React from 'react';
import {hashHistory} from 'react-router';
import Loader from 'Loader/loader.jsx';
import Alert from 'react-s-alert';

import API from 'api/wrapper.js';

class Setup extends React.Component {

  constructor(props) {
    super(props);
    this.handleSignUp = this.handleSignUp.bind(this);
  }

  handleSignUp() {
    var user = {
      name: encodeURIComponent(this.refs.user_name.value),
      about: encodeURIComponent(this.refs.user_about.value),
      email: encodeURIComponent(this.refs.user_email.value),
      password: encodeURIComponent(this.refs.user_password.value)
    };
    var that = this;
    API.call("setup","POST","",user)
    .then(function(user){
      Alert.success('Admin user generated');
      hashHistory.push('login');
    })
    .catch(function(err){
      Alert.error(err);
    })
  }


  render () {
    return(
      <div className=" setup-form container">
      <div className="row">

        <div className="col-md-6">
          <h1><b>Welcome,</b></h1>
          <h3>Matterwiki is a simple wiki for teams</h3><br/>
          <h4>People use it to store documentation, notes, culture guidelines, employee onboarding content
          and everything they want to.</h4><br/>


        </div>
      <div className="col-md-6">
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
        <button onClick={this.handleSignUp} className="btn btn-default btn-block btn-lg">Setup My Account</button>
      </div>
    </form>
      </div>
        </div>

  </div>);
  }
}

export default Setup;
