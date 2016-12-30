import React from 'react';
import autosize from 'autosize';
import Error from './error.jsx';
import {hashHistory} from 'react-router';
var Remarkable = require('remarkable');


class NewArticle extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {body: "", topics: [], error: ""};
  }

  handleChange() {
    this.setState({body: this.refs.body.value});
  }

  componentDidMount() {
    console.log("Component Mounted!");
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
      console.log(response);
      return response.json();
    })
    .then(function(response) {
      if(response.error.error)
        that.setState({error: response.error.message})
      else {
        that.setState({topics: response.data})
        console.log(that.state.topics);
      }
      console.log(response);
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
      console.log(response);
      return response.json();
    })
    .then(function(response) {
      if(response.error.error)
        that.setState({error: response.error.message})
      else {
          hashHistory.push('article/'+response.data.id+'?new=true');
      }
    });
  }


  getRawMarkupBody() {
    var md = new Remarkable();
    return { __html: md.render(this.state.body) };
  }

  render() {
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
        <div className="col-md-12">
          <button className="btn btn-default btn-block btn-lg" onClick={this.handleSubmit}>Create Article</button>
        </div>
      </div>
    </div>
    );
  }
}

export default NewArticle;
