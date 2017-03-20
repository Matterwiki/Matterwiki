import React from 'react';
import BrowseTopics from './browse_topics.jsx';
import BrowseArticles from './browse_articles.jsx';
import {hashHistory} from 'react-router';
import Loader from './loader.jsx';
import Alert from 'react-s-alert';
import MatterwikiAPI from '../../../api/MatterwikiAPI.js';

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.state = {topicId: '1', articles: [], topics: [], loading: true, articlesloading: false};
  }

  handleUpdate(id) {
    var that = this;
    this.setState({articlesloading: true});
    MatterwikiAPI.call("topic/"+id+"/articles","GET",window.localStorage.getItem('userToken'))
    .then(function(articles){
      console.log("Response from topic/id/articles");
      console.log(articles);
      that.setState({articles: articles.data, articlesloading: false})
    })
  }

  componentDidMount() {
    var that = this;
    this.setState({loading: false});
    MatterwikiAPI.call("articles","GET",window.localStorage.getItem('userToken'))
    .then(function(articles){
      MatterwikiAPI.call("topics","GET",window.localStorage.getItem('userToken'))
      .then(function(topics){
        that.setState({articles: articles.data, topics: topics.data, loading: false})
      }).catch(function(err){
        //Alert.error(err);
      })
    }).catch(function(err){
      //Alert.error(err);
    })
  }


  render () {
    if(this.state.loading)
      return <Loader/>;
    else
      return(<div className="row">

        <div className="col-md-3">
            <BrowseTopics
              topicChange={this.handleUpdate}
              topics={this.state.topics}/>
        </div>
        <div className="col-md-9">
            <BrowseArticles
              topicId={this.state.topicId}
              articles={this.state.articles}
              loading={this.state.articlesloading}
              />
        </div>
      </div>);
  }
}

export default Home;
