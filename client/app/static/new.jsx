import React from 'react';
import autosize from 'autosize';
import Error from './error.jsx';
import {hashHistory} from 'react-router';
import Loader from './loader.jsx';
import Markdown from './markdown.jsx';
import Alert from 'react-s-alert';
var Remarkable = require('remarkable');
var md = new Remarkable({
html: true,
breaks: true,
linkify: true
});


class NewArticle extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {body: "", topics: [], error: "", loading: true};
  }

  handleChange() {
    this.setState({body: this.refs.body.value});
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
      that.setState({loading: false});
    });
    autosize(document.querySelectorAll('textarea'));
  }

  handleSubmit(e) {
    e.preventDefault();
    var body = this.refs.body.value;
    var title = this.refs.title.value;
    var topicId = this.refs.topic.value;

    var myHeaders = new Headers({
        "Content-Type": "application/x-www-form-urlencoded",
        "x-access-token": localStorage.getItem('userToken')
    });
    var myInit = { method: 'POST',
               headers: myHeaders,
               body: "title="+title+"&body="+body+"&topic_id="+topicId+"&user_id="+localStorage.getItem("userId")
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
          Alert.success("Article has been successfully saved")
          hashHistory.push('article/'+response.data.id+'?new=true');
      }
    });
  }


  getRawMarkupBody() {
    return { __html: md.render(this.state.body) };
  }

  render() {
    if(this.state.loading)
      return <Loader/>;
    else
    return (
      <div className="new-article">
        <Error error={this.state.error} />
        <div className="row">
          <div className="col-md-12">
            <textarea
              ref="title"
              className="form-control input-title"
              placeholder="Enter article title..."
               />
         </div>
         </div>
         <div className="row">
          <div className="col-md-6 new-article-form">
            <textarea
              onChange={this.handleChange}
              ref="body"
              className="form-control input-body"
              placeholder="Start writing here..."
               />
               <br/>
               <label>Choose topic</label>
               <select className="form-control topic-select" ref="topic">
                 {this.state.topics.map(topic => (
                   <option value={topic.id} key={topic.id}>{topic.name}</option>
                 ))}
               </select>
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
        <button className="btn btn-default" data-toggle="modal" data-target="#myModal">Markdown Help</button>
        <br/>
        <br/>
        <div className="col-md-12">
          <button className="btn btn-default btn-block btn-lg" onClick={this.handleSubmit}>Create Article</button>
        </div>
      </div>
      <div className="modal fade" id="myModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <h1><b>Markdown Guide</b></h1>
            </div>
            <div className="modal-body">
              <center>
                  <Markdown />
              </center>
            </div>

          </div>
        </div>
      </div>
    </div>
    );
  }
}

export default NewArticle;
