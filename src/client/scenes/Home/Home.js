import React from "react";
import { connect } from "react-redux";
import store from "store";
import { Row, Col } from "react-bootstrap";
import ArticlesList from "components/ArticlesList/ArticlesList";
import Loader from "components/Loader/Loader";

import {
  loadHomepage,
  disposeHomepage,
  fetchArticlesByTopic
} from "store/modules/sagaActions";

import TopicsList from "./components/TopicsList/TopicsList";

class Home extends React.Component {
  componentDidMount() {
    store.dispatch(loadHomepage());
  }

  componentWillUnmount() {
    store.dispatch(disposeHomepage());
  }

  handleTopicClick = topicId => {
    store.dispatch(fetchArticlesByTopic(topicId));
  };

  render() {
    const {
      topics: { topics },
      articles: { articles, loading: loadingArticles },
      app: { loading }
    } = store.getState();
    if (loading) return <Loader />;
    return (
      <Row>
        <Col md={3}>
          <TopicsList topics={topics} onTopicClick={this.handleTopicClick} />
        </Col>
        <Col md={9}>
          {loadingArticles ? <Loader /> : <ArticlesList articles={articles} />}
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = state => ({
  topics: state.topics.topics,
  articles: state.articles,
  loadingArticles: state.articles.loading,
  loading: state.app.loading
});

export default connect(mapStateToProps)(Home);
