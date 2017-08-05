import React from 'react';
import {hashHistory} from 'react-router';
import Alert from 'react-s-alert';
import Loader from './loader.jsx';

class EditUser extends React.Component {

  constructor(props) {
    super(props);
    this.editUser = this.editUser.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {loading: true, name: "", about: "", email: "", password: ""}
  }

  handleChange(event) {
    const {value, name} = event.target;
    this.setState({
      [name]: value
    });
  }

  componentDidMount() {
    var myHeaders = new Headers({
        "Content-Type": "application/x-www-form-urlencoded",
        "x-access-token": window.localStorage.getItem('userToken')
    });
    var myInit = { method: 'GET',
               headers: myHeaders,
               };
    var that = this;
    fetch('/api/users/'+this.props.params.userId,myInit)
    .then(function(response) {
      return response.json();
    })
    .then(function(response) {
      if(response.error.error)
        Alert.error(response.error.message);
      else {
        that.setState({name: response.data.name, about: response.data.about, email: response.data.email, loading: false})
      }
    });
  }

  createQueryStringFromUserMap(userMap) {
    const result = [];
    for (let key in userMap) {
      // Make sure there is a value for all fields except "about" which should be able to be cleared
      if (userMap.hasOwnProperty(key) && ( userMap[key].length > 0 || key === 'about' )) {
        result.push(`${key}=${encodeURIComponent(userMap[key])}`);
      }
    }
    return result.join('&');
  }

  editUser(event) {

    event.preventDefault();

    var user = {
      name: this.state.name,
      about: this.state.about,
      email: this.state.email,
      password: this.state.password,
      id: this.props.params.userId
    };

    var myHeaders = new Headers({
        "Content-Type": "application/x-www-form-urlencoded",
        "x-access-token": window.localStorage.getItem('userToken')
    });

    var myInit = {
      method: 'PUT',
      headers: myHeaders,
      body: this.createQueryStringFromUserMap(user)
    };

    fetch('/api/users/', myInit)
    .then(function(response) {
      return response.json();
    })
    .then(function(response) {
      if(response.error.error)
        Alert.error(response.error.message);
      else {
          Alert.success('User has been edited');
          hashHistory.push('admin');
      }
    });
  }


  render () {
    if(this.state.loading)
      return <Loader />
    else
        return(
          <div>
                  <div className="row">
                    <div className="col-md-12 col-sd-12">
                      <h1><b>Update User</b></h1>
                      <br/>
                        <form>
                          <div className="col-sm-12 form-group">
                            <input type="text" className="form-control" name="name" id="inputUserName" placeholder="Name" value={this.state.name} onChange={this.handleChange} />
                          </div>
                          <div className="col-sm-12 form-group">
                            <input type="text" className="form-control" name="about" id="inputUserAbout" placeholder="About" value={this.state.about} onChange={this.handleChange}/>
                          </div>
                          <div className="col-sm-12 form-group">
                            <input type="text" className="form-control" name="email" id="inputUserName" placeholder="Email" value={this.state.email} onChange={this.handleChange} />
                          </div>
                          <div className="col-sm-12 form-group">
                            <input type="password" className="form-control" name="password" id="inputUserName" placeholder="Password" value={this.state.password} onChange={this.handleChange} />
                          </div>
                      <div className="col-sm-12 form-group">
                        <button onClick={this.editUser} className="btn btn-default btn-block btn-lg">Update User</button>
                      </div>
                    </form>
                    </div>
                  </div>
                </div>);
  }
}

export default EditUser;
