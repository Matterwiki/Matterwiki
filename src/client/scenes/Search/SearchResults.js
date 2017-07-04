import React from "react";
import FaFrownO from "react-icons/lib/fa/frown-o";
import { HelpBlock } from "react-bootstrap";
import "url-search-params-polyfill";

import APIProvider from "utils/APIProvider";
import ArticlesList from "components/ArticlesList/ArticlesList";
import Loader from "components/Loader/Loader";

import "./SearchResults.css";

// TODO - fix an encoding problem when the query param contains symbols and other weird stuff
class Search extends React.Component {
  state = {
    articles: [],
    loading: true
  };

  componentWillMount() {
    this.getSearchResults();
  }

  componentWillReceiveProps() {
    this.getSearchResults();
  }

  componentWillUnmount() {
    this.setState({
      articles: []
    });
  }

  getSearchResults = () => {
    const { search } = this.props.location;
    const params = new URLSearchParams(search);
    const query = params.get("query");

    this.setState({
      loading: true,
      query
    });

    return APIProvider.query("search", { query }).then(articles => {
      this.setState({
        articles,
        loading: false
      });
    });
  };

  render() {
    const { articles, loading, query } = this.state;
    if (loading) return <Loader message={`Looking up ${query}`} />;
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
