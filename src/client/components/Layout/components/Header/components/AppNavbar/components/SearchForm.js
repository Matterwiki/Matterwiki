import React from "react";
import { NavForm, Button, Input } from "ui";
import { DisplayFlexRow } from "ui/utils";
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
      <NavForm onSubmit={this.onSubmit}>
        <Input
          className="search-input"
          type="text"
          placeholder="Search"
          value={this.state.searchText}
          onChange={this.onChange}
        />
        <Button type="submit" className="search-button">
          <FaSearch />
        </Button>
      </NavForm>
    );
  }
}

export default withRouter(SearchForm);
