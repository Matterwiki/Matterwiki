import React from 'react';
import Error from './error.jsx';
import {Link, browserHistory} from 'react-router';
class BrowseArticles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {error: "", articles: []};
  }
  componentDidMount(){
    console.log("Component Mounted!");
    var myHeaders = new Headers({
        "Content-Type": "application/x-www-form-urlencoded",
        "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNoaXZhbUBtYXR0ZXJ3aWtpLmNvbSIsImlkIjoyLCJuYW1lIjoiU2hpdmFtIiwicGFzc3dvcmQiOiIkMmEkMTAkYlJpVlRNSE9Lb2JCbTlGNktIR1RVT3hPMEswWWZvbTRYNHRiYUg4aHZSV3J5bFZRTHNqcUsiLCJhYm91dCI6Im5vIGlkZWEiLCJjcmVhdGVkX2F0IjoiMjAxNi0wOS0yNCAxMTozMjowMCIsInVwZGF0ZWRfYXQiOiIyMDE2LTA5LTI0IDExOjMyOjAwIiwiaWF0IjoxNDgyNTY3NTIxLCJleHAiOjE0ODI2NTM5MjF9.88UVanC8JG-qpDOKW5Bu1Dgk6aJfuu0F28KnxPO6vFM"
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
                <Link to={"/article/"+article.id} >{article.title}</Link>
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
