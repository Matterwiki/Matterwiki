import React from 'react';
import {Link} from 'react-router';

const App = React.createClass({
  render () {
    return(<div>
      <nav className="navbar container">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="/">
              <img src="../assets/logo.png"></img>
            </a>
          </div>

          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav navbar-right">
              <Link to="article/new"><button type="button" className="btn btn-default navbar-btn">New Article</button>
              </Link>
              <button type="button" className="btn btn-default navbar-btn">Logout</button>
            </ul>
          </div>
        </div>
      </nav>
        <div className="content container">
            {this.props.children}
          </div>
    </div>);
  }
});

export default App;
