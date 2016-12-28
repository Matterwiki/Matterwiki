import React from 'react';
import Login from './login.jsx';
import {Link, hashHistory} from 'react-router';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.state = {user: {
      id: "",
      email: "",
      token: ""
    }};
  }


  handleLogin(id,email,token) {
    this.setState({user: {
      id: id,
      email, email,
      token: token
    }});
  }

  handleLogout() {
    this.setState({user: {
      id: "",
      email: "",
      token: ""
    }});
  }

  render () {
    var that = this;
    return(
      <div>
      <nav className="navbar container">
        <div className="container-fluid">
          { (this.state.user.token) ?
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>

              <Link to='/' className="navbar-brand">
                <img src="../assets/logo.png"></img>
              </Link>

          </div>
          :
          <center>
          <a className="navbar-login-logo" href="/">
            <img src="../assets/logo.png"></img>
          </a>
        </center>
        }
          {(this.state.user.token) ?
          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav navbar-right">
             <li><Link to="article/new" className="">New Article
              </Link>
            </li>
            <li>
              <a href="" className="">Logout</a>
            </li>
            </ul>
          </div>
          : <div/>}
        </div>
      </nav>
        <div className="content container">
          {(this.state.user.token) ? React.cloneElement(that.props.children, {
            user: this.state.user
          }) :
          <Login userLogin={that.handleLogin} /> }
          </div>
    </div>

  );
  }
}

export default App;
