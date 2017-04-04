import React from 'react';
import {hashHistory} from 'react-router';
import Alert from 'react-s-alert';
import Loader from 'Loader/loader.jsx';

import WikiEditor from 'WikiEditor/index.jsx';

import API from 'api/wrapper.js';

class EditArticle extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {body: "",title: "", topic_id: "", topics: [], loading: true, isHtml : false};
  }

  handleChange() {
    this.setState({ title: this.refs.title.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    var that = this;
    // get the rawContent from refs
    const rawContent = this.refs.editor.getRawContent();
    this.setState({body : rawContent});
    var article = {
        id: this.props.params.articleId,
        body: JSON.stringify(rawContent),
        title: encodeURIComponent(this.refs.title.value),
        topic_id: encodeURIComponent(this.refs.topic.value),
        user_id: window.localStorage.getItem("userId"),
        what_changed: encodeURIComponent(this.refs.what_changed.value)
    }
    if(article.body && article.title && article.topic_id && article.what_changed) {
          API.call("articles","PUT",window.localStorage.getItem('userToken'),article)
          .then(function(article){
              Alert.success("Article has been successfully saved");
              hashHistory.push('article/'+that.props.params.articleId);
          })
          .catch(function(err){
              Alert.error(response.error.message);
          })
    }
    else {
      Alert.error("Article Body, Title, Topic and Change Info is required.");
    }
  }


  componentDidMount() {
    var that = this;
    API.call("articles/"+this.props.params.articleId,"GET",window.localStorage.getItem('userToken'))
    .then(function(articles){
      API.call("topics","GET",window.localStorage.getItem('userToken'))
      .then(function(topics){

      // Some hacks to maintain backward compatibility
      // TODO Remove this after a few releases

      that.setState({ body: JSON.parse(articles.data.body_json), title: articles.data.title, topic_id: articles.data.topic_id, topics: topics.data, loading: false})

      if(articles.data.body && !articles.data.body_json) {
        // a flag to check if there is still someone stuck using HTML Markup for the Wiki Articles
        that.setState({
          isHtml : true,
          body : articles.data.body,
          loading: false
        })
      }
    }).catch(function(err){
        Alert.error(err)
    })
    })
    .catch(function(err){
        Alert.error(err);
    })
  }

  render() {
    if(this.state.loading)
      return <Loader/>;
    else
      return (
        <div className="new-article">
          <div className="row">
            <div className="col-md-12">
              <input
                onChange={this.handleChange}
                ref="title"
                className="form-control input-title"
                value={this.state.title}
              />
           </div>
           </div>
           <br/>
           <div className="row">
            <div className="col-md-12 new-article-form">
                 <WikiEditor
                   ref='editor'
                   rawContent={this.state.body}
                   isHtml={this.state.isHtml}
                   />
                 <br/>
                 <label>Choose topic</label>
                 <select className="form-control topic-select" ref="topic" defaultValue={this.state.topic_id}>
                   {this.state.topics.map(topic => (
                     <option value={topic.id} key={topic.id}>{topic.name}</option>
                   ))}
                 </select>
                 <br/>
                 <div className="whatwrapper">
                 <label>What improvements did you make in this edit?</label>
                 <textarea
                   ref="what_changed"
                   className="form-control what_changed what"
                   id="what"
                   placeholder="Example: Fixed a typo. It's grammer not grammar"
                    />
                  <p className="help-block">Keep it short and descriptive :)</p>
                  </div>
                  <br/>
            </div>

        <div className="row">
          <div className="col-md-12">
            <button className="btn btn-default btn-block btn-lg" onClick={this.handleSubmit}>Update Article</button>
          </div>
        </div>
      </div>
      </div>
      );
  }
}

export default EditArticle;
