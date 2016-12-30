import React from 'react';

class Loader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {message: "Loading..."};
  }

  componentDidMount() {
    var that = this;
    setTimeout(function(){
      that.setState({message: "There seems to be a problem in processing your request. Please try again." });
      console.log("FIRED!");
    }, 20000);
  }

  render () {
      return(<div className="loader"><div className="loading"></div>
    <p className="help-block">{this.state.message}</p>
      </div>);
  }
}

export default Loader;
