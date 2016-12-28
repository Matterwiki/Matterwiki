import React from 'react';
import BrowseTopics from './browse_topics.jsx';
import BrowseArticles from './browse_articles.jsx';

class Home extends React.Component {

  render () {

    return(<div className="row container">

      <div className="col-md-3">
          <BrowseTopics user={this.props.user}/>
      </div>
      <div className="col-md-9">
          <BrowseArticles user={this.props.user}/>
      </div>
    </div>);
  }
}

export default Home;
