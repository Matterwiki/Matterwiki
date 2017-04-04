import React from 'react';
import {hashHistory} from 'react-router';

class SearchForm extends React.Component {

  constructor(props) {
    super(props);
    this.searchWiki = this.searchWiki.bind(this);
  }

  searchWiki() {
    var results = '/search?query='+this.refs.search.value;
    hashHistory.push(results);
  }

  render () {
      return(
        <form className="navbar-form navbar-right" onSubmit={this.searchWiki}>
          <div className="form-group">
            <input type="text" className="form-control search-input" placeholder="Search" ref="search"/>
          </div>
          <button type="submit" className="btn search-button"><i className="fa fa-search"></i></button>
        </form>
      );
  }
}

export default SearchForm;
