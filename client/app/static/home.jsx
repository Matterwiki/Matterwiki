import React from 'react';
import BrowseTopics from './browse_topics.jsx';
import BrowseArticles from './browse_articles.jsx';

const Home = React.createClass({
  render () {
    return(<div className="row container">
    <div className="page-title">
      Browse Articles
      
    </div>
      <div className="col-md-4">
          <BrowseTopics />
      </div>
      <div className="col-md-8">
          <BrowseArticles />
      </div>
    </div>);
  }
});

export default Home;
