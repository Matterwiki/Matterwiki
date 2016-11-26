import React from 'react';

class Error extends React.Component {
  render () {
    if(this.props.error=="")
      return <div></div>;
    else
      return(<div className="alert alert-danger" role="alert">
              {this.props.error}
            </div>)
  }
}

export default Error;
