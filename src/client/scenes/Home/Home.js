import React from "react";
import { connect } from "react-redux";
import store from "state/store";
import { Row, Col } from "ui";
import { FullHeightContainer } from "ui/utils";
import ArticlesList from "components/ArticlesList/ArticlesList";
import Loader from "components/Loader/Loader";

import {
  loadHomepage,
  disposeHomepage,
  fetchArticlesByTopic
} from "state/actions/sagaActions";

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
      topics: { topics, currentTopic },
      articles: { articles, loading: loadingArticles },
      app: { loading }
    } = store.getState();
    if (loading) return <Loader />;
    return (
      <Row marginTop="1">
        <Col width="25">
          <FullHeightContainer borderRight>
            <TopicsList
              topics={topics}
              onTopicClick={this.handleTopicClick}
              activeTopic={currentTopic}
            />
          </FullHeightContainer>
        </Col>
        <Col>
          {loadingArticles ? <Loader /> : <ArticlesList articles={articles} />}
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = state => ({
  topics: state.topics.topics,
  currentTopic: state.topics.currentTopic,
  articles: state.articles,
  loadingArticles: state.articles.loading,
  loading: state.app.loading
});

export default connect(mapStateToProps)(Home);
