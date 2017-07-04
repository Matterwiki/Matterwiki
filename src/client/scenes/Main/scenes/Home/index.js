import React from "react";
import { hashHistory } from "react-router";
import { Grid, Row, Col } from "react-bootstrap";

import TopicsList from "./components/TopicsList/index";
import ArticlesList from "components/ArticlesList/index";
import APIProvider from "utils/APIProvider";

class Home extends React.Component {
  state = {
    articles: null,
    topics: []
  };

  handleTopicClick = topicId => {
    this.setState({
      articles: null
    });

    APIProvider.get(`topics/${topicId}/articles`).then(articles =>
      this.setState({ articles })
    );
  };

  componentDidMount() {
    Promise.all([
      APIProvider.get("articles"),
      APIProvider.get("topics")
    ]).then(responses => {
      const articles = responses[0];
      const topics = responses[1];

      this.setState({
        articles,
        topics
      });
    });
  }

  render() {
    const { topics, articles } = this.state;
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

export default Home;
