import React from "react";
import { Navbar, Form, FormGroup, FormControl, Button } from "react-bootstrap";
import { hashHistory } from "react-router";
import FaSearch from "react-icons/lib/fa/search";

class SearchForm extends React.Component {
  constructor(...args) {
    super(...args);

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      searchText: ""
    };
  }

  onChange(e) {
    this.setState({
      searchText: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();

    this.setState(prevState => {
      const { searchText } = this.state;
      hashHistory.push(`/search?query=${searchText}`);

      return {
        searchText: ""
      };
    });
  }

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

export default SearchForm;
