import React from 'react';

class LoggedOutNavbar extends React.Component {

  render () {
    return(
      <center>
        <a className="navbar-login-logo" href="#">
          <img src="../../../assets/logo.png"></img>
        </a>
      </center>
    );
  }
}

export default LoggedOutNavbar;
