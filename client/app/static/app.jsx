import React from 'react';
import {Link} from 'react-router';

const App = React.createClass({
  render () {
    return(<div>
      <p>Matterwiki</p>
      <ul>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/product">Product</Link></li>
      </ul>
        <div className="content">
            {this.props.children}
          </div>
    </div>);
  }
});

export default App;
