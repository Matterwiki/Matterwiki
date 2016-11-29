import React from 'react';
import Error from './error.jsx';

class BrowseTopics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {error: "", topics: []};
  }
  componentDidMount(){
    console.log("Component Mounted!");
    var myHeaders = new Headers({
        "Content-Type": "application/x-www-form-urlencoded",
        "x-access-token": ""
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
  render () {
    if(this.state.error) {
      return <Error error={this.state.error} />
    }
    if(this.state.topics.length<1) {
      return <div>There are no topics</div>;
    }
    else {
      return(<div>
            <div className="topic-list">
            {this.state.topics.map(topic => (
            <div key={topic.id} className="topic-item">
              <div className="topic-item-title">
                {topic.name}
              </div>
              <div className="topic-item-description">
                {topic.description}
              </div>
            </div>

          ))}</div>
      </div>);
    }
  }
}

export default BrowseTopics;
