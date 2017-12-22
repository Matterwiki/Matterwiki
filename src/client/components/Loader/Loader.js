import React from "react";

import "./Loader.css";

// TODO move this to a const file
const FALLBACK_MSG = "There seems to be a problem in processing your request. Please try again.";

class Loader extends React.Component {
  constructor(props) {
    super(props);
    this.state = { message: props.message || "" };
  }

  componentDidMount() {
    this.runFallback = setTimeout(() => this.setState({ message: FALLBACK_MSG }), 10000);
  }

  componentWillUnmount() {
    clearTimeout(this.runFallback);
  }

  render() {
    return (
      <div className="loader">
        <div className="loading" />
        <p className="help-block">{this.state.message}</p>
      </div>
    );
  }
}

export default Loader;
