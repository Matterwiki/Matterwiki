import React from "react";
import { connect } from "react-redux";
import { NavForm, Button, Input, Icon } from "ui";
import { withRouter } from "react-router-dom";
import { loadArticleSearchPage } from "store/modules/sagaActions";

class SearchForm extends React.Component {
  state = {
    searchText: ""
  };

  onChange = e => {
    this.setState({
      searchText: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const { searchText } = this.state;
    this.props.history.push(`/search?query=${searchText}`);
    this.props.loadArticleSearchPage(searchText);
  };

  render() {
    const { query } = this.props;
    return (
      <NavForm onSubmit={this.onSubmit}>
        <Icon type="search" />
        <Input
          type="text"
          placeholder="Search"
          value={this.state.searchText || query || ""}
          onChange={this.onChange}
        />
      </NavForm>
    );
  }
}

const mapStateToProps = state => ({
  query: state.search.query
});

const mapDispatchToProps = dispatch => ({
  loadArticleSearchPage: query => dispatch(loadArticleSearchPage(query))
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SearchForm)
);
