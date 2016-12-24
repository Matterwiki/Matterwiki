import React from 'react';
import Error from './error.jsx';

class ViewArticle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {error: "", article: {}};
  }
  componentDidMount(){
    console.log("Component Mounted!");
    console.log(this.props.params.articleId);
    var myHeaders = new Headers({
        "Content-Type": "application/x-www-form-urlencoded",
        "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNoaXZhbUBtYXR0ZXJ3aWtpLmNvbSIsImlkIjoyLCJuYW1lIjoiU2hpdmFtIiwicGFzc3dvcmQiOiIkMmEkMTAkYlJpVlRNSE9Lb2JCbTlGNktIR1RVT3hPMEswWWZvbTRYNHRiYUg4aHZSV3J5bFZRTHNqcUsiLCJhYm91dCI6Im5vIGlkZWEiLCJjcmVhdGVkX2F0IjoiMjAxNi0wOS0yNCAxMTozMjowMCIsInVwZGF0ZWRfYXQiOiIyMDE2LTA5LTI0IDExOjMyOjAwIiwiaWF0IjoxNDgyNTY3NTIxLCJleHAiOjE0ODI2NTM5MjF9.88UVanC8JG-qpDOKW5Bu1Dgk6aJfuu0F28KnxPO6vFM"
    });
    var myInit = { method: 'GET',
               headers: myHeaders,
               };
    var that = this;
    fetch('/api/articles/'+this.props.params.articleId,myInit)
    .then(function(response) {
      console.log(response);
      return response.json();
    })
    .then(function(response) {
      if(response.error.error)
        that.setState({error: response.error.message})
      else {
        that.setState({article: response.data})
        console.log(that.state.article);
      }
      console.log(response);
    });
  }
  render () {
    if(this.state.error) {
      return <Error error={this.state.error} />
    }
    if(this.state.article) {
      return(<div>
        <div className="article-heading">
            <h1 className="single-article-title">{this.state.article.title}
            </h1>
            <div className="single-article-meta">
              Last updated on {new Date(this.state.article.updated_at).toDateString()}
            </div>
          </div>
            <div className="single-article-body">
            {this.state.article.body}
            </div>
            </div>
            );
    }
    else {
      return <div>There are no articles</div>;
    }
  }
}

export default ViewArticle;
