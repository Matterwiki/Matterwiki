import React from 'react';
import Alert from 'react-s-alert';

class LogoUpload extends React.Component {

  constructor(props) {
    super(props);
    this.handleUpload = this.handleUpload.bind(this);
  }

  handleUpload(e) {
    e.preventDefault();
    var logo = this.refs.logo.files[0];
    var formData = new FormData();
    formData.append('logo', logo);
    var myHeaders = new Headers({
        "x-access-token": window.localStorage.getItem('userToken')
    });
    var myInit = { method: 'POST',
                headers: myHeaders,
               body: formData
               };
    var that = this;
    fetch('/api/logo/',myInit)
    .then(function(response) {
      return response.json();
    })
    .then(function(response) {
      if(response.error.error) {
        Alert.error(response.error.message);
      }
      else {
        Alert.success("Your logo has been successfully updated.")
      }
    });
  }

  render () {
    return(
      <div className="row">
        <div className="col-md-6 col-sd-12">
        <h2><b>Change Logo</b></h2>
        <hr/>
        <form method="POST" encType="multipart/form-data" onSubmit={this.handleUpload}>
            <input type="file" name="logo" ref="logo" className="form-control"/>
            <p className="help-block">Please reload the page for the changes to reflect throughout the site.</p>
            <br/>
            <input type="submit" value="Upload Logo" className="btn btn-default btn-block btn-lg"/>
        </form>
        </div>
      </div>
  );
  }
}

export default LogoUpload;
