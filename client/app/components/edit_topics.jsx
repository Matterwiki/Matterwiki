import React from 'react';
import {hashHistory} from 'react-router';
import Alert from 'react-s-alert';
import Loader from './loader.jsx';
import MatterwikiAPI from '../../../api/MatterwikiAPI.js';

class EditTopic extends React.Component {

  constructor(props) {
    super(props);
    this.editTopic = this.editTopic.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {topic: "", loading: true, name: "", description: ""}
  }

  handleChange() {
    this.setState({name: this.refs.topic_name.value, description: this.refs.topic_description.value});
  }

  componentDidMount() {
    var that = this;
    MatterwikiAPI.call("topics/"+this.props.params.topicId,"GET",window.localStorage.getItem('userToken'))
    .then(function(topic){
        that.setState({name: topic.data.name, description: topic.data.description, loading: false})
    })
    .catch(function(err){
        //Alert.error(err);
    });
  }

  editTopic(e) {
    var that = this;
    var topic = {
      name: encodeURIComponent(this.refs.topic_name.value),
      description: encodeURIComponent(this.refs.topic_description.value),
      id: this.props.params.topicId
    };
    MatterwikiAPI.call("topics","PUT",window.localStorage.getItem('userToken'),topic)
    .then(function(topic){
        Alert.success('Topic has been edited');
        hashHistory.push('admin');
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
          <div>
                  <div className="row">
                    <div className="col-md-12 col-sd-12">
                      <h1><b>Update Topic</b></h1>
                      <br/>
                        <form>
                          <div className="col-sm-12 form-group">
                            <input type="text" className="form-control" ref="topic_name" id="inputTopicName" placeholder="Name" value={this.state.name} onChange={this.handleChange} />
                          </div>
                          <div className="col-sm-12 form-group">
                            <input type="text" className="form-control" ref="topic_description" id="inputTopicAbout" placeholder="Description" value={this.state.description} onChange={this.handleChange}/>
                          </div>
                      <div className="col-sm-12 form-group">
                        <button onClick={this.editTopic} className="btn btn-default btn-block btn-lg">Update Topic</button>
                      </div>
                    </form>
                    </div>
                  </div>
                </div>);
  }
}

export default EditTopic;
