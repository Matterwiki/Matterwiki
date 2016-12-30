import React from 'react';
import Error from './error.jsx';
import Loader from './loader.jsx';
import {hashHistory} from 'react-router';

class BrowseArchives extends React.Component {
  constructor(props) {
    super(props);
    this.archiveSelect = this.archiveSelect.bind(this);
    this.state = {error: "", archives: []};
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
    var url = '/api/articles/'+this.props.articleId+'/history';
    fetch(url,myInit)
    .then(function(response) {
      console.log(response);
      return response.json();
    })
    .then(function(response) {
      if(response.error.error)
        that.setState({error: response.error.message})
      else {
        that.setState({archives: response.data})
        console.log(that.state.archives);
      }
      console.log(response);
    });
  }

  archiveSelect(id,e) {
    e.preventDefault();
    this.props.archiveChange(id)
  }


  render () {
    if(this.state.error) {
      return <Error error={this.state.error} />
    }
    if(this.state.archives.length<1) {
      return <Loader />;
    }
    else {
      return(
        <div className="custom-collapse">
          <div className="visible-xs">
        <button className="collapse-toggle btn btn-default" type="button" data-toggle="collapse" data-parent="custom-collapse" data-target="#side-menu-collapse">
          View Topics
         </button>
        <br/>
        <br/>
        </div>
        <div className="list-group collapse" id="side-menu-collapse">
            {this.state.archives.map(archive => (
              <a key={archive.id} href="#" className="list-group-item dropdown-toggle" onClick={(e) => this.archiveSelect(archive.id,e)}>
                <h4 className="list-group-item-heading">{new Date(archive.updated_at).toDateString()}</h4>
                <p className="list-group-item-text">{archive.what_changed}</p>
              </a>
          ))}</div>
      </div>);
    }
  }
}

export default BrowseArchives;
