import React from 'react';
import Error from './error.jsx';
import Loader from './loader.jsx';
import {hashHistory} from 'react-router';

class BrowseTopics extends React.Component {
  constructor(props) {
    super(props);
    this.topicSelect = this.topicSelect.bind(this);
    this.state = {error: "", topics: []};
  }

  componentDidMount() {
    console.log("Component Mounted!");
    var myHeaders = new Headers({
        "Content-Type": "application/x-www-form-urlencoded",
        "x-access-token": localStorage.getItem('userToken')
    });
    var myInit = { method: 'GET',
               headers: myHeaders,
               };
    var that = this;
    fetch('/api/topics',myInit)
    .then(function(response) {
      console.log(response);
      return response.json();
    })
    .then(function(response) {
      if(response.error.error)
        that.setState({error: response.error.message})
      else {
        that.setState({topics: response.data})
        console.log(that.state.topics);
      }
      console.log(response);
    });
  }

  topicSelect(id,e) {
    e.preventDefault();
    this.props.topicChange(id)
  }


  render () {
    if(this.state.error) {
      return <Error error={this.state.error} />
    }
    if(this.state.topics.length<1) {
      return <Loader />;
    }
    else {
      return(<div>
        <div className="list-group">
            {this.state.topics.map(topic => (
              <a key={topic.id} href="#" className="list-group-item" onClick={(e) => this.topicSelect(topic.id,e)}>
                <h4 className="list-group-item-heading">{topic.name}</h4>
                <p className="list-group-item-text">{topic.description}</p>
              </a>
          ))}</div>
      </div>);
    }
  }
}

export default BrowseTopics;
