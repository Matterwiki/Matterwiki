import React from 'react';
import { hashHistory } from 'react-router';
import Alert from 'react-s-alert';

import API from 'api/wrapper.js';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    if(window.localStorage.getItem('userToken')) {
      hashHistory.push('home');
    }
  }

  handleSubmit(e){
    e.preventDefault();
    var that = this;
    var auth = {
      email: encodeURIComponent(this.refs.email.value),
      password: encodeURIComponent(this.refs.password.value)
    }
    console.log(auth);
    API.call("authenticate","POST","",auth)
    .then(function(user){
        window.localStorage.setItem('userToken',user.data.token);
        window.localStorage.setItem('userId',user.data.user.id);
        window.localStorage.setItem('userEmail',user.data.user.token);
        hashHistory.push('home');
        Alert.success('You are now logged in');
    })
    .catch(function(err){
        //Alert.error(err);
    });
  }

  render () {
    return(<div className="container login-box row">
      <div className="col-md-12 col-sm-12">
          <form>
        <div className="col-sm-12 form-group">
          <input type="email" className="form-control" id="inputEmail" placeholder="Email" ref="email" />
        </div>
        <div className="col-sm-12 form-group">
          <input type="password" className="form-control" id="inputPassword" placeholder="Password" ref="password" />
        </div>
        <div className="col-sm-12 form-group">
          <button onClick={this.handleSubmit} className="btn btn-default btn-block ">Sign in</button>
        </div>
      </form>
      </div>
    </div>);
  }
}

export default Login;
