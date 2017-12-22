import React from "react";
import { connect } from "react-redux";
import { Row, Col } from "react-bootstrap";
import ArticlesList from "components/ArticlesList/ArticlesList";
import Loader from "components/Loader/Loader";

import { loadHomepage, disposeHomepage, fetchArticlesByTopic } from "store/modules/sagaActions";

import TopicsList from "./components/TopicsList/TopicsList";

class Home extends React.Component {
  componentDidMount() {
    this.props.loadHomepage();
  }

  componentWillUnmount() {
    this.props.disposeHomepage();
  }

  handleTopicClick = topicId => {
    this.props.fetchArticlesByTopic(topicId);
  };

  render() {
    const { topics, articles, loadingArticles, loading } = this.props;
    if (loading) return <Loader />;
    return (
      <Row>
        <Col md={3}>
          <TopicsList topics={topics} onTopicClick={this.handleTopicClick} />
        </Col>
        <Col md={9}>{loadingArticles ? <Loader /> : <ArticlesList articles={articles} />}</Col>
      </Row>
    );
  }
}

const mapStateToProps = state => ({
  topics: state.topics.topics,
  articles: state.articles.articles,
  loadingArticles: state.articles.loading,
  loading: state.app.loading
});

const mapDispatchToProps = dispatch => ({
  loadHomepage: () => dispatch(loadHomepage()),
  disposeHomepage: () => dispatch(disposeHomepage()),
  fetchArticlesByTopic: id => dispatch(fetchArticlesByTopic(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
