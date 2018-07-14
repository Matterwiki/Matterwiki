import React from "react";
import { connect } from "react-redux";
import "url-search-params-polyfill";

import ArticlesList from "components/ArticlesList/ArticlesList";
import { Loader, HelpBlock } from "ui";
import { Flex } from "ui/utils";

import NoResultsFound from "assets/noresults.svg";

import { loadArticleSearchPage, disposeArticleSearchPage } from "store/modules/sagaActions";

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
    return !results.length ? (
      <Flex flexDirection="column" alignItems="center">
        <img src={NoResultsFound} alt="No results found" />
        <h3>No results found for {query}</h3>
      </Flex>
    ) : (
      <React.Fragment>
        <HelpBlock>
          We found {results.length} articles for {query}
        </HelpBlock>
        <ArticlesList articles={results} />
      </React.Fragment>
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
