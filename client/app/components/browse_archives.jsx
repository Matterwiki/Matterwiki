import React from 'react';
import Loader from './loader.jsx';
import {hashHistory} from 'react-router';
import Alert from 'react-s-alert';
import MatterwikiAPI from '../../../api/MatterwikiAPI.js';

class BrowseArchives extends React.Component {
  constructor(props) {
    super(props);
    this.archiveSelect = this.archiveSelect.bind(this);
  }

  archiveSelect(id,e) {
    e.preventDefault();
    this.props.archiveChange(id)
  }


  render () {
    if(this.props.archives.length<1) {
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
            {this.props.archives.map(archive => (
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
