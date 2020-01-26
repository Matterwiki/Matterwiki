import React from 'react'
import { connect } from 'react-redux'
import { NavForm, Input } from 'ui'
import { withRouter } from 'react-router-dom'
import { loadArticleSearchPage } from 'store/modules/sagaActions'
import { setArticleSearchQuery } from 'store/modules/search'

class SearchForm extends React.Component {
  handleChange = e => {
    this.props.setArticleSearchQuery(e.target.value)
  };

  handleSubmit = e => {
    e.preventDefault()
    const query = this.props.query
    this.props.history.push(`/search?query=${query}`)
    this.props.loadArticleSearchPage(query)
  };

  render () {
    const { query } = this.props
    return (
      <NavForm onSubmit={this.handleSubmit}>
        <Input type='text' placeholder='Search' value={query || ''} onChange={this.handleChange} />
      </NavForm>
    )
  }
}

const mapStateToProps = state => ({
  query: state.search.query
})

const mapDispatchToProps = dispatch => ({
  loadArticleSearchPage: query => dispatch(loadArticleSearchPage(query)),
  setArticleSearchQuery: query => dispatch(setArticleSearchQuery(query))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchForm))
