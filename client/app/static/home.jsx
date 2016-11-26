import React from 'react';

const Home = React.createClass({
  render () {
    return(<div className="row container">
      <div className="col-md-4">
          four grid
      </div>
      <div className="col-md-8">
          eight grid
      </div>
    </div>);
  }
});

export default Home;
