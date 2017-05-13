import React from "react";
import { hashHistory } from "react-router";
import { Grid, Row, Col } from "react-bootstrap";

import TopicsList from "./TopicsList/index";
import ArticlesList from "../ArticlesList/index";
import API from "api/wrapper.js";

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

    API.call(
      `topic/${id}/articles`,
      "GET",
      window.localStorage.getItem("userToken")
    ).then(response => {
      this.setState({
        articles: response.data
      });
    });
  }

  componentDidMount() {
    const token = window.localStorage.getItem("userToken");

    Promise.all([
      // call articles
      API.call("articles", "GET", token),
      // call topics
      API.call("topics", "GET", token)
    ])
      .then(responses => {
        const articles = responses[0].data;
        const topics = responses[1].data;

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
