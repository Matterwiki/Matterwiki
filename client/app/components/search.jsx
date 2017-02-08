import React from 'react';
import Loader from './loader.jsx';
import {Link, hashHistory} from 'react-router';
import Alert from 'react-s-alert';


class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = { articles: [], loading: true};
  }

  componentWillMount() {
    var myHeaders = new Headers({
        "Content-Type": "application/x-www-form-urlencoded",
        "x-access-token": window.localStorage.getItem('userToken')
    });
    var myInit = { method: 'GET',
               headers: myHeaders,
               };
    var that = this;
    fetch('/api/search?query='+encodeURIComponent(this.props.location.query.query),myInit)
    .then(function(response) {
      return response.json();
    })
    .then(function(response) {
      if(response.error.error)
        Alert.error(response.error.message);
      else {
        that.setState({articles: response.data})
      }
      that.setState({loading: false});
    });
  }

  componentWillReceiveProps(nextProps) {
    var myHeaders = new Headers({
        "Content-Type": "application/x-www-form-urlencoded",
        "x-access-token": window.localStorage.getItem('userToken')
    });
    var myInit = { method: 'GET',
               headers: myHeaders,
               };
    var that = this;
    fetch('/api/search?query='+nextProps.location.query.query,myInit)
    .then(function(response) {
      return response.json();
    })
    .then(function(response) {
      if(response.error.error){
        Alert.error(response.error.message);
      }
      else {
          that.setState({articles: response.data});
      }
      that.setState({loading: false});
    });
  }

  componentWillUnmount() {
    this.setState({articles: []});
  }

  render () {
    if(this.state.loading)
      return <Loader/>;
    else
      return(<div>
            <div className="result-info">
              <p className="help-block">
                We found {this.state.articles.length} articles for your query
              </p>
            </div>
            {(this.state.articles.length>0) ?
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
        :
        <div className="no-results">
          <i className="fa fa-frown-o"></i>
          <p>Please try again with another query</p>
        </div>

        }
      </div>);
    }
}

export default Search;
