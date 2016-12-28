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
        "x-access-token": this.props.user.token
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
