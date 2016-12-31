import React from 'react';
import Error from './error.jsx';
import { hashHistory } from 'react-router';
import Alert from 'react-s-alert';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    if(localStorage.getItem('userToken')) {
      hashHistory.push('home');
    }
  }

  handleSubmit(){
    console.log("Login initiated");
    var email = document.getElementById("inputEmail").value;
    var password = document.getElementById("inputPassword").value;
    var myHeaders = new Headers({
        "Content-Type": "application/x-www-form-urlencoded"
    });
    var myInit = { method: 'POST',
               headers: myHeaders,
               body: "email="+email+"&password="+password
              };
    var that = this;
    fetch('/api/authenticate',myInit)
    .then(function(response) {
      console.log(response);
      return response.json();
    })
    .then(function(response) {
      if(response.error.error)
        Alert.error(response.error.message);
      else {
        localStorage.setItem('userToken',response.data.token);
        localStorage.setItem('userId',response.data.user.id);
        localStorage.setItem('userEmail',response.data.user.token);
        hashHistory.push('home');
        Alert.success('You are now logged in');
        console.log("Logged In. Token Received.");
        console.log(localStorage.getItem('userToken'));
      }
      console.log(response);
    });
  }

  render () {
    return(<div className="container login-box row">
      <div className="col-md-12 col-sm-12">
        <h3>Login</h3>
          <form>
        <div className="col-sm-12 form-group">
          <input type="email" className="form-control" id="inputEmail" placeholder="Email" />
        </div>
        <div className="col-sm-12 form-group">
          <input type="password" className="form-control" id="inputPassword" placeholder="Password" />
        </div>
        <div className="col-sm-12 form-group">
          <button onClick={this.handleSubmit} className="btn btn-default btn-block btn-lg">Sign in</button>
        </div>
      </form>
      </div>
    </div>);
  }
}

export default Login;
