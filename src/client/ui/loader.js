import React from "react";
import styled from "styled-components";

// TODO move this to a const file
const FALLBACK_MSG = "There seems to be a problem in processing your request. Please try again.";

const LoaderWrapper = styled.div`
  text-align: center;
  max-width: 300px;
  padding: 10px;
  margin: 0px auto;

  .loading {
    border-radius: 50%;
    margin: 0px auto;
    width: 30px;
    height: 30px;
    border: 0.25rem solid ${props => (props.theme ? props.theme.primary : "#ff0066")};
    border-top-color: white;
    -webkit-animation: spin 1s infinite linear;
    animation: spin 1s infinite linear;
  }

  @-webkit-keyframes spin {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  @keyframes spin {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
`;

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
      <LoaderWrapper>
        <div className="loading" />
        <p className="help-block">{this.state.message}</p>
      </LoaderWrapper>
    );
  }
}

export default Loader;
