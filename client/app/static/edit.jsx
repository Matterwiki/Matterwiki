import React from 'react';
import autosize from 'autosize';
import Error from './error.jsx';
var Remarkable = require('remarkable');


class EditArticle extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {error: "",body: "",title: ""};
  }

  handleChange() {
    this.setState({body: this.refs.body.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    $('#myModal').modal('show')
  }

  getRawMarkupBody() {
    var md = new Remarkable();
    return { __html: md.render(this.state.body) };
  }


  componentDidMount() {
    console.log(this.props.params.articleId);
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
      console.log(response);
      return response.json();
    })
    .then(function(response) {
      if(response.error.error)
        that.setState({error: response.error.message})
      else {
        that.setState({body: response.data.body, title: response.data.title})
        console.log(that.state.body);
      }
      console.log(response);
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
          </div>
          <div className="col-md-6">

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
      <div className="modal modal-fullscreen fade" id="myModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            </div>
            <div className="modal-body">
              <center>
              <div className="row">

                <div className="col-md-6 col-sd-12">
                  <h1><b>One last thing...</b></h1><h4>Just to make it easy for everyone</h4>
                  <br/>
                  <h3><b>What improvements did you make in this edit?</b></h3>
                  <textarea
                    ref="what_changed"
                    className="form-control"
                    placeholder="Example: Fixed a typo. It's grammer not grammar"
                     />
                   <p className="help-block">Keep it short and descriptive :)</p>
                   <br/>
                   <button type="button" className="btn btn-default btn-block btn-lg" data-dismiss="modal">Update it!</button>
                </div>
              </div>
            </center>
            </div>

          </div>
        </div>
      </div>
    </div>
    );
  }
}

export default EditArticle;
