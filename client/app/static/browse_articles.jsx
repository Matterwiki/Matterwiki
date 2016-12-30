import React from 'react';
import Error from './error.jsx';
import Loader from './loader.jsx';
import {Link, browserHistory} from 'react-router';
class BrowseArticles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {error: "", articles: [], url: "/api/articles"};
  }

  componentDidMount() {
    console.log("Component Mounted!");
    var myHeaders = new Headers({
        "Content-Type": "application/x-www-form-urlencoded",
        "x-access-token": localStorage.getItem('userToken')
    });
    var myInit = { method: 'GET',
               headers: myHeaders,
               };
    var that = this;
    var url = '/api/articles';
    console.log(url);
    fetch(url,myInit)
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

  componentWillReceiveProps(nextProps) {
    console.log('PREV PROPS');
    console.log(this.props.topicId);
    console.log('NEXT PROPS');
    console.log(nextProps.topicId);
    console.log("Component Mounted!");
    var myHeaders = new Headers({
        "Content-Type": "application/x-www-form-urlencoded",
        "x-access-token": localStorage.getItem('userToken')
    });
    var myInit = { method: 'GET',
               headers: myHeaders,
               };
    var that = this;
    var url = '/api/articles';
    if(nextProps.topicId==null && this.props.topicId==null)
      var url = '/api/articles';
    else
      var url = '/api/topic/'+nextProps.topicId+'/articles';
    console.log(url);
    fetch(url,myInit)
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
      return <Loader />;
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
                Last updated on {new Date(article.updated_at).toDateString()}
              </div>
              <hr className="article-separator"></hr>
            </div>

          ))}</div>
      </div>);
    }
  }
}

export default BrowseArticles;
