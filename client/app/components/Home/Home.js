import React from "react";
import { hashHistory } from "react-router";
import { Grid, Row, Col } from "react-bootstrap";

import TopicsList from "./TopicsList/index";
import ArticlesList from "../ArticlesList/index";
import APIProvider from "utils/APIProvider";

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      articles: null,
      topics: []
    };

    this.handleTopicClick = this._handleTopicClick.bind(this);
  }

  _handleTopicClick(id) {
    this.setState({
      articles: null
    });

    APIProvider.get(`topic/${id}/articles`).then(articles =>
      this.setState({ articles })
    );
  }

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
