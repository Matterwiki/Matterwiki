import React from 'react';
import {Link} from 'react-router';

const App = React.createClass({
  render () {
    return(<div>
      <center>
        <img src="../assets/logo.png" className="primary-logo"></img>
      </center>
        <div className="content container">
            {this.props.children}
          </div>
    </div>);
  }
});

export default App;
