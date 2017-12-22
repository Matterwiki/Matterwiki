import React from "react";
import { connect } from "react-redux";
import FaFrownO from "react-icons/lib/fa/frown-o";
import { HelpBlock } from "react-bootstrap";
import "url-search-params-polyfill";

import ArticlesList from "components/ArticlesList/ArticlesList";
import Loader from "components/Loader/Loader";

import { loadArticleSearchPage, disposeArticleSearchPage } from "store/modules/sagaActions";

import "./SearchResults.css";

// TODO - fix an encoding problem when the query param contains symbols and other weird stuff
class Search extends React.Component {
  componentWillMount() {
    this.getSearchResults();
  }

  componentWillUnmount() {
    this.props.disposeArticleSearchPage();
  }

  getSearchResults = () => {
    const { search } = this.props.location;
    const params = new URLSearchParams(search);
    const query = params.get("query");
    this.props.loadArticleSearchPage(query);
  };

  render() {
    const { query, results, loading } = this.props;
    if (loading) return <Loader message={`Looking up ${query}`} />;
    return (
      <div>
        <div className="result-info">
          <HelpBlock>
            We found {results.length} articles for {query}
          </HelpBlock>
        </div>
        {!results.length ? (
          <div className="no-results">
            <FaFrownO size={100} />
            <p>Please try again with another query</p>
          </div>
        ) : (
          <ArticlesList articles={results} />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  query: state.search.query,
  results: state.search.results,
  loading: state.search.loading
});

const mapDispatchToProps = dispatch => ({
  loadArticleSearchPage: query => dispatch(loadArticleSearchPage(query)),
  disposeArticleSearchPage: () => dispatch(disposeArticleSearchPage())
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
