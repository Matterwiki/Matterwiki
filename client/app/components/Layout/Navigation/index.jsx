import React from 'react';
import Login from 'Authentication/login.jsx';
import SearchForm from './Search/searchform.jsx';
import {Link, hashHistory} from 'react-router';
import Alert from 'react-s-alert';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentWillMount() {
    if(window.localStorage.getItem('userToken')==null) {
      hashHistory.push('login');
    }
  }

  handleLogout() {
    window.localStorage.setItem('userToken','');
    Alert.success("You've been successfully logged out");
  }

  render () {
    var that = this;
    return(
        <div>
          <nav className="navbar container-fluid navbar-default">
            {
              (window.localStorage.getItem('userToken'))
              ? <LoggedInNavbar handleLogout={this.handleLogout}/>
              : <LoggedOutNavbar />
            }
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
