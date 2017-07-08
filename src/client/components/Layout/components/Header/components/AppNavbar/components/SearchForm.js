import React from "react";
import { Navbar, Form, FormGroup, FormControl, Button } from "react-bootstrap";
import FaSearch from "react-icons/lib/fa/search";
import { withRouter } from "react-router-dom";

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

    this.setState(() => {
      const { searchText } = this.state;
      this.props.history.push(`/search?query=${searchText}`);
      return {
        searchText: ""
      };
    });
  };

  render() {
    return (
      <Navbar.Form pullRight>
        <Form onSubmit={this.onSubmit}>
          <FormGroup>
            <FormControl
              className="search-input"
              type="text"
              placeholder="Search"
              value={this.state.searchText}
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

export default withRouter(SearchForm);
