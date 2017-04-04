import React from 'react';
import SearchForm from '../Search/searchform.jsx';
import {Link, hashHistory} from 'react-router';

class LoggedInNavbar extends React.Component {

  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout(e) {
    e.preventDefault();
    this.props.handleLogout();
  }

  render () {
    return(
      <div className="navbar-header">
        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
          <span className="sr-only">Toggle navigation</span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
        </button>
          <Link to='home' className="navbar-brand">
            <img src="../../../assets/logo.png"></img>
          </Link>
      </div>
      <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        <ul className="nav navbar-nav navbar-right">
          {(window.localStorage.getItem('userId')==1) ?
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
        <SearchForm />
      </div>
    );
  }
}

export default LoggedInNavbar;
