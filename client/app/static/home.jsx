import React from 'react';
import BrowseTopics from './browse_topics.jsx';
import BrowseArticles from './browse_articles.jsx';
import {hashHistory} from 'react-router';
import Loader from './loader.jsx';

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.state = {topicId: '1', loading: true};
  }

  handleUpdate(id) {
      this.setState({topicId: id});
  }

  componentDidMount() {
    this.setState({loading: false});
  }


  render () {
    if(this.state.loading)
      return <Loader/>;
    else
    return(<div className="row">

      <div className="col-md-3">
          <BrowseTopics topicChange={this.handleUpdate} />
      </div>
      <div className="col-md-9">
          <BrowseArticles topicId={this.state.topicId} />
      </div>
    </div>);
  }
}

export default Home;
