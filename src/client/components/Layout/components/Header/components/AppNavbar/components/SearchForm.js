import React from "react";
import { connect } from "react-redux";
import { Navbar, Form, FormGroup, FormControl, Button } from "react-bootstrap";
import FaSearch from "react-icons/lib/fa/search";
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
      <Navbar.Form pullRight>
        <Form onSubmit={this.onSubmit}>
          <FormGroup>
            <FormControl
              className="search-input"
              type="text"
              placeholder="Search"
              value={this.state.searchText || query || ""}
              onChange={this.onChange}
            />
          </FormGroup>
          <Button type="submit" className="search-button">
            <FaSearch />
          </Button>
        </Form>
      </Navbar.Form>
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
