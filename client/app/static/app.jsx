import React from 'react';
import Login from './login.jsx';
import {Link, hashHistory} from 'react-router';
import Alert from 'react-s-alert';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentWillMount() {
    if(localStorage.getItem('userToken')==null) {
      hashHistory('login');
    }
  }

  handleLogout() {
    localStorage.setItem('userToken','');
    Alert.success("You've been successfully logged out");
  }

  render () {
    var that = this;
    return(
      <div>
      <nav className="navbar container navbar-default">
        <div className="container-fluid">
          {(localStorage.getItem('userToken')) ?
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
              <Link to='home' className="navbar-brand">
                <img src="../assets/logo.png"></img>
              </Link>
          </div>
          :
          <center>
          <a className="navbar-login-logo" href="#">
            <img src="../assets/logo.png"></img>
          </a>
        </center>
        }
          {(localStorage.getItem('userToken')) ?
          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav navbar-right">
              {(localStorage.getItem('userId')==1) ?
                <li><Link to="admin" className="">Admin
                  </Link>
                </li> :
                ''
              }
             <li><Link to="article/new" className="">New Article
              </Link>
            </li>
            <li>
              <a href="" onClick={this.handleLogout} >Logout</a>
            </li>
            </ul>
          </div>
          : <div/>}
        </div>
      </nav>
        <div className="content container">
          {that.props.children}
          </div>
        <div className="footer center-align">
          <p className="help-block">Powered by <a href="http://matterwiki.com">Matterwiki</a></p>
        </div>
           <Alert stack={{limit: 3}} position='bottom'/>
    </div>

  );
  }
}

export default App;
