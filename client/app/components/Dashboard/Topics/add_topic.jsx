import React from 'react';
import {hashHistory} from 'react-router';
import Alert from 'react-s-alert';
import Loader from 'Loader/loader.jsx';
import API from 'api/wrapper.js';

class AddTopic extends React.Component {

  constructor(props) {

    super(props);

    this.addTopic = this.addTopic.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = { name: "", description: "" }

  }

  handleChange() {

    this.setState({
      name: this.refs.topic_name.value,
      description: this.refs.topic_description.value
    });

  }

  addTopic(e) {

    e.preventDefault();

    var topic = {
      name: encodeURIComponent(this.state.name),
      description: encodeURIComponent(this.state.description)
    };

    this.props.addTopic(topic);

    this.setState({ name: "", description: "" });

  }


  render () {

    return (
        <div>
          <div className="row">
            <div className="col-md-12 col-sd-12">
              <h1><b>Add Topic</b></h1>
              <form>
                <div className="col-sm-12 form-group">
                  <input
                    type="text"
                    className="form-control"
                    ref="topic_name"
                    id="inputTopicName"
                    placeholder="Name"
                    value={this.state.name}
                    onChange={this.handleChange} />
                </div>
                <div className="col-sm-12 form-group">
                  <input
                    type="text"
                    className="form-control"
                    ref="topic_description"
                    id="inputTopicAbout"
                    placeholder="Description"
                    value={this.state.description}
                    onChange={this.handleChange}/>
                </div>
                <div className="col-sm-12 form-group">
                  <button onClick={this.addTopic} className="btn btn-default btn-block btn-lg">Add Topic</button>
                </div>
              </form>
            </div>
          </div>
        </div>);
  }

}

export default AddTopic;
