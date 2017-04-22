import React from 'react';
import {hashHistory} from 'react-router';
import Alert from 'react-s-alert';
import Loader from './loader.jsx';

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
    var myHeaders = new Headers({
        "Content-Type": "application/x-www-form-urlencoded",
        "x-access-token": window.localStorage.getItem('userToken')
    });
    var myInit = { method: 'GET',
               headers: myHeaders,
               };
    var that = this;
    fetch('/api/topics/'+this.props.params.topicId,myInit)
    .then(function(response) {
      return response.json();
    })
    .then(function(response) {
      if(response.error.error)
        Alert.error(response.error.message);
      else {
        that.setState({name: response.data.name, description: response.data.description, loading: false})
      }
    });
  }

  editTopic(e) {
    var topic = {
      name: encodeURIComponent(this.refs.topic_name.value),
      description: encodeURIComponent(this.refs.topic_description.value),
      id: this.props.params.topicId
    };
    var myHeaders = new Headers({
        "Content-Type": "application/x-www-form-urlencoded",
        "x-access-token": window.localStorage.getItem('userToken')
    });
    var myInit = { method: 'PUT',
               headers: myHeaders,
               body: "name="+topic.name+"&description="+topic.description+"&id="+topic.id
               };
    var that = this;
    fetch('/api/topics/',myInit)
    .then(function(response) {
      return response.json();
    })
    .then(function(response) {
      if(response.error.error)
        Alert.error(response.error.message);
      else {
          Alert.success('Topic has been edited');
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
