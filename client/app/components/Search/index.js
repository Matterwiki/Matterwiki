import React from "react";
import Loader from "Loader/index";
import { Link, hashHistory } from "react-router";
import Alert from "react-s-alert";
import FaFrownO from "react-icons/lib/fa/frown-o";
import { HelpBlock } from "react-bootstrap";

import APIProvider from "utils/APIProvider";
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

    return APIProvider.get(`/search?query=${query}`).then(articles => {
      this.setState({
        articles,
        loading: false
      });
    });
  }

  componentWillMount() {
    this.getSearchResults(this.props.location.query.query);
  }

  componentWillReceiveProps(nextProps) {
    this.getSearchResults(this.props.location.query.query);
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
              We found {articles.length} articles for {query}
            </HelpBlock>
          </div>
          {!this.state.articles.length
            ? <div className="no-results">
                <FaFrownO size={100} />
                <p>Please try again with another query</p>
              </div>
            : <ArticlesList articles={articles} />}
        </div>
      );
  }
}

export default Search;
