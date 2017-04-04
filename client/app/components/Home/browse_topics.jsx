import React from 'react';
import Loader from 'Loader/loader.jsx';
import {hashHistory} from 'react-router';
import Alert from 'react-s-alert';

class BrowseTopics extends React.Component {
  constructor(props) {
    super(props);
    this.topicSelect = this.topicSelect.bind(this);
    this.state = { selected_topic: 1 }
  }

  topicSelect(id,e) {
    e.preventDefault();
    this.props.topicChange(id);
    this.setState({ selected_topic: id });
  }


  render () {
    if(this.props.topics.length<1) {
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
            {this.props.topics.map(topic => (
              <a key={topic.id} href="#" className={"list-group-item dropdown-toggle "+((this.state.selected_topic==topic.id)?"active":"")} onClick={(e) => this.topicSelect(topic.id,e)}>
                <h4 className="list-group-item-heading">{decodeURIComponent(topic.name)}</h4>
                <p className="list-group-item-text">{decodeURIComponent(topic.description)}</p>
              </a>
          ))}</div>
      </div>);
    }
  }
}

export default BrowseTopics;
