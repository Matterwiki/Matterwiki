import React from 'react';
import BrowseTopics from './browse_topics.jsx';
import BrowseArticles from './browse_articles.jsx';
import {hashHistory} from 'react-router';

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.state = {topicId: '1'};
  }

  handleUpdate(id) {
      this.setState({topicId: id});
  }


  render () {
    return(<div className="row container">

      <div className="col-md-3">
          <BrowseTopics user={this.props.user} topicChange={this.handleUpdate} />
      </div>
      <div className="col-md-9">
          <BrowseArticles user={this.props.user} topicId={this.state.topicId} />
      </div>
    </div>);
  }
}

export default Home;
