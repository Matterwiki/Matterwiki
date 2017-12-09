import React from "react";
import { connect } from "react-redux";
import store from "state/store";
import { addArticles, emptyArticles } from "state/actions/article";
import { addTopics } from "state/actions/topic";
import { Row, Col } from "react-bootstrap";
import ArticlesList from "components/ArticlesList/ArticlesList";
import Loader from "components/Loader/Loader";

import APIProvider from "utils/APIProvider";
import { loadHomepage, disposeHomepage } from "state/actions/sagaActions";

import TopicsList from "./components/TopicsList/TopicsList";

class Home extends React.Component {
  componentDidMount() {
    store.dispatch(loadHomepage());
  }

  componentWillUnmount() {
    store.dispatch(disposeHomepage());
  }

  handleTopicClick = topicId => {
    store.dispatch(emptyArticles());
    APIProvider.get(`topics/${topicId}/articles`).then(topic =>
      store.dispatch(addArticles(topic.article))
    );
  };

  render() {
    const {
      topics: { topics },
      articles: { articles },
      app: { loading }
    } = store.getState();
    console.log("loading", loading);
    if (loading) return <Loader />;
    return (
      <Row>
        <Col md={3}>
          <TopicsList topics={topics} onTopicClick={this.handleTopicClick} />
        </Col>
        <Col md={9}>
          <ArticlesList articles={articles} />
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = state => ({
  topics: state.topics.topics,
  articles: state.articles,
  loading: state.app.loading
});

export default connect(mapStateToProps)(Home);
