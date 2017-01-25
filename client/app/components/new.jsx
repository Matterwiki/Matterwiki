import React from 'react';
import {hashHistory} from 'react-router';
import Loader from './loader.jsx';
import Alert from 'react-s-alert';

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
      that.setState({loading: false});
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    var body = this.refs.body.value;
    var title = this.refs.title.value;
    var topicId = this.refs.topic.value;
    if(body && title && topicId) {
        var myHeaders = new Headers({
            "Content-Type": "application/x-www-form-urlencoded",
            "x-access-token": window.localStorage.getItem('userToken')
        });
        var myInit = { method: 'POST',
                   headers: myHeaders,
                   body: "title="+encodeURIComponent(title)+"&body="+encodeURIComponent(body)+"&topic_id="+topicId+"&user_id="+window.localStorage.getItem("userId")
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
    else {
      Alert.error("Article Body, Title and Topic Information is required.");
    }
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
              ref="title"
              className="form-control input-title"
              placeholder="Enter article title..."
               />
         </div>
         </div>
         <br/>
         <div className="row">
          <div className="col-md-12 new-article-form">
                <trix-toolbar id="my_toolbar"></trix-toolbar>
            <trix-editor toolbar="my_toolbar" input="my_input" placeholder="Start writing here...." class="input-body"></trix-editor>
            <input id="my_input" type="hidden" value="" ref="body" onChange={this.handleChange}/>
               <br/>
               <label>Choose topic</label>
               <select className="form-control topic-select" ref="topic">
                 {this.state.topics.map(topic => (
                   <option value={topic.id} key={topic.id}>{topic.name}</option>
                 ))}
               </select>
          </div>
        </div>
        <br/>
        <br/>
        <div className="col-md-12">
          <button className="btn btn-default btn-block btn-lg" onClick={this.handleSubmit}>Create Article</button>
        </div>
      </div>
    );
  }
}

export default NewArticle;
