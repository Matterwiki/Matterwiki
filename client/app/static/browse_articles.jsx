import React from 'react';
import Error from './error.jsx';

class BrowseArticles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {error: "", articles: []};
  }
  componentDidMount(){
    console.log("Component Mounted!");
    var myHeaders = new Headers({
        "Content-Type": "application/x-www-form-urlencoded",
        "x-access-token": ""
    });
    var myInit = { method: 'GET',
               headers: myHeaders,
               };
    var that = this;
    fetch('/api/articles',myInit)
    .then(function(response) {
      console.log(response);
      return response.json();
    })
    .then(function(response) {
      if(response.error.error)
        that.setState({error: response.error.message})
      else {
        that.setState({articles: response.data})
        console.log(that.state.articles);
      }
      console.log(response);
    });
  }
  render () {
    if(this.state.error) {
      return <Error error={this.state.error} />
    }
    if(this.state.articles.length<1) {
      return <div>There are no articles</div>;
    }
    else {
      return(<div>
            <div className="article-list">
            {this.state.articles.map(article => (
            <div key={article.id} className="article-item">
              <div className="article-item-title">
                {article.title}
              </div>
              <div className="article-item-description">
                {article.body}
              </div>
              <hr className="article-separator"></hr>
            </div>

          ))}</div>
      </div>);
    }
  }
}

export default BrowseArticles;
