import React from 'react';
import {hashHistory, Link} from 'react-router';
import Alert from 'react-s-alert';
import Loader from 'Loader/loader.jsx';

import API from 'api/wrapper.js';

class Topics extends React.Component {

  constructor(props) {
    super(props);
    this.deleteTopic = this.deleteTopic.bind(this);
    this.state = { loading: true, topics: [] }
  }

  componentDidMount() {
    var that = this;
    API.call("topics","GET",window.localStorage.getItem('userToken'))
    .then(function(topics){
        that.setState({topics: topics.data, loading: false})
      }).catch(function(err){
        //Alert.error(err);
    })
  }

  deleteTopic(id,e) {
    e.preventDefault();
    var that = this;
    API.call("topics?id="+id,"DELETE",window.localStorage.getItem('userToken'))
    .then(function(topic){
      topics = that.state.topics
      var topics = $.grep(topics, function(e){
         return e.id != id;
      });
      that.setState({topics: topics});
      Alert.success('Topic has been deleted');
    }).catch(function(err){
      //Alert.error(err);
    });
  }


  render () {
    if(this.state.loading)
      return <Loader />
    else
        return(
          <div className="topics">
          <div className="row container">
            <div className="col-md-12">
              <button className="btn btn-default" data-toggle="modal" data-target="#addTopic">Add Topic</button>
                <div className="list-group bordered-scroll-box">
                    {
                      this.state.topics.map(topic => (
                          <div key={topic.id} href="#" className="list-group-item">
                            <span className="pull-right">
                              <Link to={'topic/edit/'+topic.id} className="btn btn-default">Edit</Link>
                            { (topic.id !== 1) ?
                              <button className="btn btn-default" type="button" onClick={(e) => this.deleteTopic(topic.id,e)}>Delete</button>
                             : '' }
                             </span>
                            <h4 className="list-group-item-heading">{decodeURIComponent(topic.name)}</h4>
                            <p className="list-group-item-text">{decodeURIComponent(topic.description)}</p>
                          </div>
                        ))
                    }
                </div>
            </div>
          </div>
        </div>
      );
  }
}

export default Topics;
