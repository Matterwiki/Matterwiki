import React from 'react';
import Loader from './loader.jsx';
import {Link, hashHistory} from 'react-router';
import Alert from 'react-s-alert';


class BrowseArticles extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    if(this.props.loading)
      return <Loader/>
    if(this.props.articles.length<1) {
      return <p className="help-block center-align">There are no articles under this topic</p>;
    }
    else {
      return(<div>
            <div className="article-list">
            {this.props.articles.map(article => (
            <div key={article.id} className="article-item">
              <div className="article-item-title">
                <Link to={"/article/"+article.id} >{article.title}</Link>
              </div>
              <div className="article-item-description">
                Last updated on {new Date(article.updated_at.replace(' ','T')).toDateString()}
              </div>
              <hr className="article-separator"></hr>
            </div>

          ))}</div>
      </div>);
    }
  }
}

export default BrowseArticles;
