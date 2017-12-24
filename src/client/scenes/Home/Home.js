import React from "react";
import { connect } from "react-redux";
import { Row, Col } from "ui";
import { FullHeightContainer, Hide } from "ui/utils";
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
    const { topics, articles, loadingArticles, loading, currentTopic } = this.props;
    if (loading) return <Loader />;
    return [
      <Hide medium large>
        <select>
          {topics.map(topic => (
            <option
              key={topic.id}
              value={topic.name}
              onClick={e => {
                e.preventDefault();
                this.handleTopicClick(topic.id);
              }}
              selected={currentTopic && currentTopic.id === topic.id}>
              {topic.name}
            </option>
          ))}
        </select>
      </Hide>,
      <Row marginTop="1">
        <Hide small extraSmall>
          <Col width="25">
            <FullHeightContainer borderRight>
              <TopicsList
                topics={topics}
                onTopicClick={this.handleTopicClick}
                activeTopic={currentTopic}
              />
            </FullHeightContainer>
          </Col>
        </Hide>
        <Col>{loadingArticles ? <Loader /> : <ArticlesList articles={articles} />}</Col>
      </Row>
    ];
  }
}

const mapStateToProps = state => ({
  topics: state.topics.topics,
  currentTopic: state.topics.currentTopic,
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
