import React from 'react';
import {hashHistory, Link} from 'react-router';
import Alert from 'react-s-alert';
import Loader from 'Loader/loader.jsx';
import LogoUpload from './logo_upload.jsx';

import Topics from './Topics/index.jsx';
import Users from './Users/index.jsx';

import API from 'api/wrapper.js';

class Admin extends React.Component {

  constructor(props) {
    super(props);
    this.state = {loading: true, users: [], topics: [], error: ""}
  }

  componentDidMount() {
    var that = this;
    API.call("topics","GET",window.localStorage.getItem('userToken'))
    .then(function(topics){
      API.call("users","GET",window.localStorage.getItem('userToken'))
      .then(function(users){
        that.setState({topics: topics.data, users: users.data, loading: false})
      }).catch(function(err){
        //Alert.error(err);
      }).catch(function(err){
        //Alert.error(err);
      })
    })
  }


  render () {

    if(this.state.loading)

      return <Loader />

    else
        return(
          <div>
            <div className="row container">
          <Topics />
          <Users />
          </div>

          <LogoUpload />
        </div>);
  }
}

export default Admin;
