import React from 'react';
import {hashHistory, Link} from 'react-router';

import Alert from 'react-s-alert';
import Loader from 'Loader/index';

import ListTopics from './list_topics.jsx';
import AddTopic from './add_topic.jsx';

import API from 'api/wrapper.js';

class Topics extends React.Component {

  constructor(props) {

    super(props);

    this.addTopic = this.addTopic.bind(this);
    this.deleteTopic = this.deleteTopic.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.state = { loading: true, topics: [], loading_topics: true }

  }


  handleUpdate() {
    /*

    This function sends a request to the topics endpoint then
    updates the component state with the list of all topics

    */
    var that = this;
    this.setState({ loading_topics: true })
    API.call("topics","GET",window.localStorage.getItem('userToken'))
    .then(function(topics){
          that.setState({ topics: topics.data, loading_topics: false, loading: false })
      }).catch(function(err){
        //Alert.error(err);
    })
  }

  componentDidMount() {
    /*

    Whenever the component mounts we update the topics list

    */
    this.handleUpdate();
  }

  deleteTopic(id) {

    /*

    This function takes the ID of the topic to be deleted.
    Then sends a DELETE request to the API.
    On a successful request it calls the update function to update the list.

    */

    var that = this;

    API.call("topics?id="+id,"DELETE",window.localStorage.getItem('userToken'))
    .then(function(topic){

      Alert.success('Topic has been deleted');
      that.handleUpdate();

    })
    .catch(function(err){

      //Alert.error(err);

    });
  }

  addTopic(topic) {

    /*

    This function takes the topic object.
      The topic object should have two keys, name and description.
    It then sends a POST request to the API.
    On a successful request it calls the update function to update the list.

    */

    var that = this;

    API.call("topics","POST",window.localStorage.getItem("userToken"),topic)
    .then(function(topic){

      Alert.success('Topic has been added');
      that.handleUpdate();

    })
    .catch(function(err){

      //Alert.error(err);

    });
  }


  render () {

    if(this.state.loading)

      return <Loader />

    else

      return(
        <div className="topics row">
            <div className="col-sm-12 col-md-4">
              <AddTopic addTopic={this.addTopic} />
            </div>
            <div className="col-sm-12 col-md-8">
              <ListTopics topics={this.state.topics} deleteTopic={this.deleteTopic} />
            </div>
        </div>
      );
  }

}

export default Topics;
