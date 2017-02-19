import React from 'react';
import {hashHistory} from 'react-router';
import Alert from 'react-s-alert';
import Loader from './loader.jsx';

import WikiEditor from './WikiEditor/index.jsx';

class EditArticle extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onContentChange = this._onContentChange.bind(this);
    this.state = {body: "",title: "", topic_id: "", topics: [], loading: true, isHtml : false};
  }

  _onContentChange(rawContent) {
    this.setState({body : rawContent});
  }

  handleChange() {
    this.setState({ title: this.refs.title.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    var body = JSON.stringify(this.state.body);
    var title = this.refs.title.value;
    var topicId = this.refs.topic.value;
    var what_changed = this.refs.what_changed.value;
    if(body && title && topicId && what_changed) {
          var myHeaders = new Headers({
              "Content-Type": "application/x-www-form-urlencoded",
              "x-access-token": window.localStorage.getItem('userToken')
          });
          var myInit = { method: 'PUT',
                     headers: myHeaders,
                     body: "id="+this.props.params.articleId+"&title="+encodeURIComponent(title)+"&body="+encodeURIComponent(body)+"&topic_id="+topicId+"&user_id="+window.localStorage.getItem("userId")+"&what_changed="+what_changed
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
    else {
      Alert.error("Article Body, Title, Topic and Change Info is required.");
    }
  }


  componentDidMount() {
    var myHeaders = new Headers({
        "Content-Type": "application/x-www-form-urlencoded",
        "x-access-token": window.localStorage.getItem('userToken')
    });
    var myInit = {
      method: 'GET',
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
        // Some hacks to maintain backward compatibility
        // TODO Remove this after a few releases

        that.setState({ body: JSON.parse(response.data.body_json), title: response.data.title, topic_id: response.data.topic_id})

        if(response.data.body && !response.data.body_json) {
          // a flag to check if there is still someone stuck using HTML Markup for the Wiki Articles
          that.setState({
            isHtml : true,
            body : response.data.body
          })
        }
      }
      that.setState({loading: false});
    });
    var myHeaders = new Headers({
        "Content-Type": "application/x-www-form-urlencoded",
        "x-access-token": window.localStorage.getItem('userToken')
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
                   onContentChange={this.onContentChange}
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
                 <label>What improvements did you make in this edit?</label>
                 <textarea
                   ref="what_changed"
                   className="form-control what_changed"
                   placeholder="Example: Fixed a typo. It's grammer not grammar"
                    />
                  <p className="help-block">Keep it short and descriptive :)</p>
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
