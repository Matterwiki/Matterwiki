import React from 'react';
import Login from './login.jsx';
import SearchForm from './searchform.jsx';
import {Link, hashHistory} from 'react-router';
import Alert from 'react-s-alert';
import translations from '../../../l10n/app.l10n.json';
import config from '../../../customization.json';
var language = translations[config.language];

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
    Alert.success(language.loggedout);
  }

  render () {
    var that = this;
    return(
      <div>
      <nav className="navbar container-fluid navbar-default">
          {(window.localStorage.getItem('userToken')) ?
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span className="sr-only">{language.toggle_navigation}</span>
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
          {(window.localStorage.getItem('userToken')) ?
          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav navbar-right">
              {(window.localStorage.getItem('userId')==1) ?
                <li><Link to="admin" className="">{language.admin}
                  </Link>
                </li> :
                ''
              }
             <li><Link to="article/new" className="">{language.new_article}
              </Link>
            </li>
            <li>
              <a href="" onClick={this.handleLogout} >{language.logout}</a>
            </li>
            </ul>
            <SearchForm />
          </div>
          : <div/>}
      </nav>
        <div className="content container">
          {that.props.children}
          </div>
        <div className="footer center-align">
          <p className="help-block">{language.powered_by} <a href="http://matterwiki.com">Matterwiki</a></p>
        </div>
           <Alert stack={{limit: 3}} position='bottom'/>
    </div>

  );
  }
}

export default App;
