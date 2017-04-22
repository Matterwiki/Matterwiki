import React from 'react';
import {Link} from 'react-router';
import Loader from './loader.jsx';
import Alert from 'react-s-alert';

class SimpleArticle extends React.Component {
  constructor(props) {
    super(props);
    this.state = { article: {}};
  }

  componentWillReceiveProps(nextProps){
    var myHeaders = new Headers({
        "Content-Type": "application/x-www-form-urlencoded",
        "x-access-token": window.localStorage.getItem('userToken')
    });
    var myInit = { method: 'GET',
               headers: myHeaders,
               };
    var that = this;
    fetch('/api/archives/'+nextProps.archiveId,myInit)
    .then(function(response) {
      return response.json();
    })
    .then(function(response) {
      if(response.error.error)
        Alert.error(response.error.message);
      else {
        that.setState({article: response.data})
      }
    });
  }

  getRawMarkupBody() {
    return { __html: this.state.article.body };
  }


  render () {
    if(this.state.article && this.state.article.user) {
      return(<div className="row">
          <div className="col-md-12">
            <div className="article-heading">
                <h1 className="single-article-title">{this.state.article.title}
                </h1>
                <div className="single-article-meta">
                  Edited by <b>{this.state.article.user.name}</b>
              </div>
            </div>
            <div className="single-article-body"
              dangerouslySetInnerHTML={this.getRawMarkupBody()}>
            </div>
          </div>
          </div>
            );
    }
    else {
      return <center><p className="help-block">Please select the archive</p></center>;
    }
  }
}

export default SimpleArticle;
