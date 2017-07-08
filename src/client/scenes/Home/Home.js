import React from "react";
import { Row, Col } from "react-bootstrap";
import ArticlesList from "components/ArticlesList/ArticlesList";

import APIProvider from "utils/APIProvider";

import TopicsList from "./components/TopicsList/TopicsList";

class Home extends React.Component {
  state = {
    articles: null,
    topics: []
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

  handleTopicClick = topicId => {
    this.setState({
      articles: null
    });

    APIProvider.get(`topics/${topicId}/articles`).then(articles =>
      this.setState({ articles })
    );
  };

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
