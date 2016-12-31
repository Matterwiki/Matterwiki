import React from 'react';
import autosize from 'autosize';
import Error from './error.jsx';
import {hashHistory} from 'react-router';
import Alert from 'react-s-alert';
var Remarkable = require('remarkable');
var md = new Remarkable({
html: true,
breaks: true,
linkify: true
});


class EditArticle extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {body: "",title: "", topics: []};
  }

  handleChange() {
    this.setState({body: this.refs.body.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    var body = this.refs.body.value;
    var title = this.refs.title.value;
    var topicId = this.refs.topic.value;
    var what_changed = this.refs.what_changed.value;

    var myHeaders = new Headers({
        "Content-Type": "application/x-www-form-urlencoded",
        "x-access-token": localStorage.getItem('userToken')
    });
    var myInit = { method: 'PUT',
               headers: myHeaders,
               body: "id="+this.props.params.articleId+"&title="+title+"&body="+body+"&topic_id="+topicId+"&user_id="+localStorage.getItem("userId")+"&what_changed="+what_changed
               };
    var that = this;
    fetch('/api/articles/',myInit)
    .then(function(response) {
      return response.json();
    })
    .then(function(response) {
      if(response.error.error)
        Alert.error(response.error.message);
      else {
          Alert.success("Article has been successfully saved");
          hashHistory.push('article/'+that.props.params.articleId);
      }
    });
  }

  getRawMarkupBody() {
    return { __html: md.render(this.state.body) };
  }


  componentDidMount() {
    var myHeaders = new Headers({
        "Content-Type": "application/x-www-form-urlencoded",
        "x-access-token": localStorage.getItem('userToken')
    });
    var myInit = { method: 'GET',
               headers: myHeaders,
               };
    var that = this;
    fetch('/api/articles/'+this.props.params.articleId,myInit)
    .then(function(response) {
      return response.json();
    })
    .then(function(response) {
      if(response.error.error)
        Alert.error(response.error.message);
      else {
        that.setState({body: response.data.body, title: response.data.title})
      }
    });
    var myHeaders = new Headers({
        "Content-Type": "application/x-www-form-urlencoded",
        "x-access-token": localStorage.getItem('userToken')
    });
    var myInit = { method: 'GET',
               headers: myHeaders,
               };
    var that = this;
    fetch('/api/topics',myInit)
    .then(function(response) {
      return response.json();
    })
    .then(function(response) {
      if(response.error.error)
        Alert.error(response.error.message);
      else {
        that.setState({topics: response.data})
      }
    });
    autosize(document.querySelectorAll('textarea'));
  }

  render() {
    if(this.state.error) {
      return <Error error={this.state.error} />
    }
    return (
      <div className="new-article">
        <div className="row">
          <div className="col-md-12">
            <textarea
              ref="title"
              className="form-control input-title"
              value={this.state.title}
               />
         </div>
         </div>
         <div className="row">
          <div className="col-md-6 new-article-form">
            <textarea
              onChange={this.handleChange}
              ref="body"
              className="form-control input-body"
              value={this.state.body}
               />
               <br/>
               <label>Choose topic</label>
               <select className="form-control topic-select" ref="topic">
                 {this.state.topics.map(topic => (
                   <option value={topic.id} key={topic.id}>{topic.name}</option>
                 ))}
               </select>
               <br/>
               <label>What improvements did you make in this edit?</label>
               <textarea
                 ref="what_changed"
                 className="form-control what_changed"
                 placeholder="Example: Fixed a typo. It's grammer not grammar"
                  />
                <p className="help-block">Keep it short and descriptive :)</p>
                <br/>
          </div>
          <div className="col-md-6">
            <p className="color-text">Preview</p>
            <div
              className="preview-body single-article-body"
              dangerouslySetInnerHTML={this.getRawMarkupBody()}
            />
          </div>
        </div>
        <br/>
        <br/>
      <div className="row">
        <div className="col-md-12">
          <button className="btn btn-default btn-block btn-lg" onClick={this.handleSubmit}>Update Article</button>
        </div>
      </div>
    </div>
    );
  }
}

export default EditArticle;
