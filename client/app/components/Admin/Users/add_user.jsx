import React from 'react';
import {hashHistory} from 'react-router';
import Alert from 'react-s-alert';
import Loader from 'Loader/index';
import API from 'api/wrapper.js';

class AddUser extends React.Component {

  constructor(props) {

    super(props);

    this.addUser = this.addUser.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = { name: "", about: "", email: "", password: "" }

  }

  handleChange() {

    this.setState({
      name: this.refs.user_name.value,
      about: this.refs.user_about.value,
      email: this.refs.user_email.value,
      password: this.refs.user_password.value
    });

  }

  addUser(e) {

    e.preventDefault();

    var user = {
      name: encodeURIComponent(this.state.name),
      about: encodeURIComponent(this.state.about),
      email: encodeURIComponent(this.state.email),
      password: encodeURIComponent(this.state.password)
    };

    this.props.addUser(user);

    this.setState({ name: "", about: "", email: "", password: "" });

  }


  render () {

    return (
        <div>
          <div className="row">
            <div className="col-md-12 col-sd-12">
                <form className="tabform">
                  <div className="row">
                    <div className="col-sm-12 form-group">
                      <input
                        type="text"
                        className="form-control"
                        ref="user_name"
                        id="inputUserName"
                        placeholder="Name"
                        value={this.state.name}
                        onChange={this.handleChange} />
                    </div>
                    <div className="col-sm-12 form-group">
                      <input
                        type="text"
                        className="form-control"
                        ref="user_about"
                        id="inputUserAbout"
                        placeholder="About"
                        value={this.state.about}
                        onChange={this.handleChange} />
                    </div>
                    <div className="col-sm-12 form-group">
                      <input
                        type="email"
                        className="form-control"
                        ref="user_email"
                        id="inputUserEmail"
                        placeholder="Email"
                        value={this.state.email}
                        onChange={this.handleChange} />
                    </div>
                    <div className="col-sm-12 form-group">
                      <input
                        type="password"
                        className="form-control"
                        ref="user_password"
                        id="inputUserPassword"
                        placeholder="Password"
                        value={this.state.password}
                        onChange={this.handleChange} />
                    </div>
                  </div>
                  <div className="col-sm-12 form-group">
                    <button onClick={this.addUser} className="btn btn-default btn-block ">Add User</button>
                  </div>
                </form>
            </div>
          </div>
        </div>);
  }

}

export default AddUser;
