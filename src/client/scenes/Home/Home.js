import React from "react";
import { connect } from "react-redux";
import { Row, Col, Button } from "ui";
import { FullHeightContainer, Hide, DisplayFlexRow } from "ui/utils";
import ArticlesList from "components/ArticlesList/ArticlesList";
import Loader from "ui/loader";

import { loadHomepage, disposeHomepage, fetchArticlesByTopic } from "store/modules/sagaActions";

import TopicsList from "./components/TopicsList/TopicsList";

class Home extends React.Component {
  componentDidMount() {
    this.props.loadHomepage();
  }

  componentWillUnmount() {
    this.props.disposeHomepage();
  }

  handleTopicClick = (topicId, e) => {
    if (e) e.preventDefault();
    this.props.fetchArticlesByTopic(topicId);
  };

  loadMoreArticles = () => {
    console.log("loading more articles...");
  };

  render() {
    const { topics, articles, loadingArticles, loading, currentTopic } = this.props;
    if (loading) return <Loader />;
    return (
      <Row marginTop="1">
        <Col widthMedium="25" widthSmall="100">
          <Hide medium large>
            <select
              onChange={e => this.handleTopicClick(e.target.value, e)}
              selected={currentTopic ? currentTopic.id : 1}>
              {topics.map(topic => (
                <option key={topic.id} value={topic.id}>
                  {topic.name}
                </option>
              ))}
            </select>
          </Hide>
          <Hide small>
            <FullHeightContainer borderRight>
              <TopicsList
                topics={topics}
                onTopicClick={this.handleTopicClick}
                activeTopic={currentTopic}
              />
            </FullHeightContainer>
          </Hide>
        </Col>
        <Col>
          {loadingArticles ? (
            <Loader />
          ) : (
            <React.Fragment>
              <ArticlesList articles={articles} />
              <DisplayFlexRow justifyContent="center" marginTop="2">
                <Button outline onClick={this.loadMoreArticles}>
                  Load More
                </Button>
              </DisplayFlexRow>
            </React.Fragment>
          )}
        </Col>
      </Row>
    );
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
