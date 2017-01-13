import React from 'react';
import Loader from './loader.jsx';
import {hashHistory} from 'react-router';
import Alert from 'react-s-alert';

class BrowseTopics extends React.Component {
  constructor(props) {
    super(props);
    this.topicSelect = this.topicSelect.bind(this);
    this.state = { topics: [], loading: true};
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
    fetch('/api/topics',myInit)
    .then(function(response) {
      return response.json();
    })
    .then(function(response) {
      if(response.error.error)
        Alert.error(response.error.message);
      else {
        that.setState({topics: response.data})
      }
    that.setState({loading: false});
    });
  }

  topicSelect(id,e) {
    e.preventDefault();
    this.props.topicChange(id)
  }


  render () {
    if(this.state.loading)
      return <Loader/>;
    if(this.state.topics.length<1) {
      return <p className="help-block center-align">There are no topics created yet</p>;
    }
    else {
      return(
        <div className="custom-collapse">
          <div className="visible-xs">
        <button className="collapse-toggle btn btn-default" type="button" data-toggle="collapse" data-parent="custom-collapse" data-target="#side-menu-collapse">
          View Topics
         </button>
        <br/>
        <br/>
        </div>
        <div className="list-group collapse" id="side-menu-collapse">
            {this.state.topics.map(topic => (
              <a key={topic.id} href="#" className="list-group-item dropdown-toggle" onClick={(e) => this.topicSelect(topic.id,e)}>
                <h4 className="list-group-item-heading">{topic.name}</h4>
                <p className="list-group-item-text">{topic.description}</p>
              </a>
          ))}</div>
      </div>);
    }
  }
}

export default BrowseTopics;
