import React from "react";
import { connect } from "react-redux";
import store from "state/store";
import { addArticles, emptyArticles } from "state/actions/article";
import { addTopics } from "state/actions/topic";
import { Row, Col } from "react-bootstrap";
import ArticlesList from "components/ArticlesList/ArticlesList";

import APIProvider from "utils/APIProvider";

import TopicsList from "./components/TopicsList/TopicsList";

class Home extends React.Component {
  componentDidMount() {
    Promise.all([
      APIProvider.get("articles"),
      APIProvider.get("topics")
    ]).then(responses => {
      const articles = responses[0];
      const topics = responses[1];
      store.dispatch(addArticles(articles));
      store.dispatch(addTopics(topics));
    });
  }

  handleTopicClick = topicId => {
    store.dispatch(emptyArticles());
    APIProvider.get(`topics/${topicId}/articles`).then(topic =>
      store.dispatch(addArticles(topic.article))
    );
  };

  render() {
    const { topics: { topics }, articles: { articles } } = store.getState();
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
  articles: state.articles
});

export default connect(mapStateToProps)(Home);
