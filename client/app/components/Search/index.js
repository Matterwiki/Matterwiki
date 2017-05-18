import React from "react";
import Loader from "Loader/index";
import { Link, hashHistory } from "react-router";
import Alert from "react-s-alert";
import FaFrownO from "react-icons/fa/frown-o";
import { HelpBlock } from "react-bootstrap";

import API from "api/wrapper.js";
import ArticlesList from "../ArticlesList/index";

import "./Search.css";

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.getSearchResults = this.getSearchResults.bind(this);

    this.state = {
      articles: [],
      loading: true
    };
  }

  getSearchResults(query) {
    const userToken = window.localStorage.getItem("userToken");

    this.setState({
      loading: true
    });

    return API.call(
      `/search?query=${query}`,
      "GET",
      userToken
    ).then(response => {
      this.setState({
        articles: response.data,
        loading: false
      });
    });
  }

  componentWillMount() {
    this.getSearchResults(encodeURIComponent(this.props.location.query.query));
  }

  componentWillReceiveProps(nextProps) {
    this.getSearchResults(encodeURIComponent(this.props.location.query.query));
  }

  componentWillUnmount() {
    this.setState({
      articles: []
    });
  }

  render() {
    const { articles, loading } = this.state;
    const query = this.props.location.query.query;

    if (loading) return <Loader message={`Looking up ${query}`} />;
    else
      return (
        <div>
          <div className="result-info">
            <HelpBlock>
              We found {articles.length} articles for your query
            </HelpBlock>
          </div>
          {!this.state.articles.length
            ? <div className="no-results">
                <FaFrownO size={100}/>
                <p>Please try again with another query</p>
              </div>
            : <ArticlesList articles={articles} />}
        </div>
      );
  }
}

export default Search;
