import React from 'react';
import BrowseTopics from './browse_topics.jsx';
import BrowseArticles from './browse_articles.jsx';

const Home = React.createClass({
  render () {
    return(<div className="row container">

      <div className="col-md-3">
          <BrowseTopics />
      </div>
      <div className="col-md-9">
          <BrowseArticles />
      </div>
    </div>);
  }
});

export default Home;
