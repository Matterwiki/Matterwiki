import React from 'react';
import Loader from './loader.jsx';
import {hashHistory} from 'react-router';
import Alert from 'react-s-alert';

class BrowseArchives extends React.Component {
  constructor(props) {
    super(props);
    this.archiveSelect = this.archiveSelect.bind(this);
    this.state = { archives: [], loading: true};
  }

  componentDidMount() {
    var myHeaders = new Headers({
        "Content-Type": "application/x-www-form-urlencoded",
        "x-access-token": window.localStorage.getItem('userToken')
    });
    var myInit = { method: 'GET',
               headers: myHeaders,
               };
    var that = this;
    var url = '/api/articles/'+this.props.articleId+'/history';
    fetch(url,myInit)
    .then(function(response) {
      return response.json();
    })
    .then(function(response) {
      if(response.error.error)
        Alert.error(response.error.message);
      else {
        that.setState({archives: response.data})
      }
      that.setState({loading: false});
    });
  }

  archiveSelect(id,e) {
    e.preventDefault();
    this.props.archiveChange(id)
  }


  render () {
    if(this.state.loading)
      return <Loader/>;
    if(this.state.archives.length<1) {
      return <p className="help-block center-align">There are no archives for this article</p>;
    }
    else {
      return(
        <div className="custom-collapse">
          <div className="visible-xs">
        <button className="collapse-toggle btn btn-default" type="button" data-toggle="collapse" data-parent="custom-collapse" data-target="#side-menu-collapse">
          View Archives
         </button>
        <br/>
        <br/>
        </div>
        <div className="list-group collapse archive-list" id="side-menu-collapse">
            {this.state.archives.map(archive => (
              <a key={archive.id} href="#" className="list-group-item dropdown-toggle" onClick={(e) => this.archiveSelect(archive.id,e)}>
                <h4 className="list-group-item-heading">{new Date(archive.updated_at.replace(' ','T')).toDateString()}</h4>
                <p className="list-group-item-text">{archive.what_changed}</p>
              </a>
          ))}</div>
      </div>);
    }
  }
}

export default BrowseArchives;
