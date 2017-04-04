import React from 'react';
import {hashHistory, Link} from 'react-router';
import Alert from 'react-s-alert';
import Loader from 'Loader/loader.jsx';

import CurrentTab from './current_tab.jsx';

import API from 'api/wrapper.js';

class Admin extends React.Component {

  constructor(props) {

    super(props);

    this.updateTab = this.updateTab.bind(this);

    this.state = {loading: true, users: [], topics: [], error: "", tab: "users"}
  }

  updateTab(name,e) {

    e.preventDefault();

     this.setState({
       tab: name
     });

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
            <ul className="admin-nav nav nav-tabs nav-justified">
              <li
                role="presentation"
                name="users"
                className={(this.state.tab=="users")?"active":""}
                onClick={(e) => this.updateTab("users",e)}>
                <a>Users</a>
              </li>
              <li
                role="presentation"
                name="topics"
                className={(this.state.tab=="topics")?"active":""}
                onClick={(e) => this.updateTab("topics",e)}>
                <a>Topics</a>
              </li>
              <li
                role="presentation"
                name="design"
                className={(this.state.tab=="design")?"active":""}
                onClick={(e) => this.updateTab("design",e)}>
                <a>Design</a>
              </li>
            </ul>
          <CurrentTab tab={this.state.tab} />
        </div>);
  }
}

export default Admin;
