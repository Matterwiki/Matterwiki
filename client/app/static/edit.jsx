import React from 'react';
import autosize from 'autosize';
import Error from './error.jsx';
var Remarkable = require('remarkable');


class EditArticle extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {error: "",body: ""};
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
        "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNoaXZhbUBtYXR0ZXJ3aWtpLmNvbSIsImlkIjoyLCJuYW1lIjoiU2hpdmFtIiwicGFzc3dvcmQiOiIkMmEkMTAkYlJpVlRNSE9Lb2JCbTlGNktIR1RVT3hPMEswWWZvbTRYNHRiYUg4aHZSV3J5bFZRTHNqcUsiLCJhYm91dCI6Im5vIGlkZWEiLCJjcmVhdGVkX2F0IjoiMjAxNi0wOS0yNCAxMTozMjowMCIsInVwZGF0ZWRfYXQiOiIyMDE2LTA5LTI0IDExOjMyOjAwIiwiaWF0IjoxNDgyNTY3NTIxLCJleHAiOjE0ODI2NTM5MjF9.88UVanC8JG-qpDOKW5Bu1Dgk6aJfuu0F28KnxPO6vFM"
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
        that.setState({body: response.data})
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
          <button className="btn btn-default btn-block btn-lg" onClick={this.handleSubmit}>Create Article</button>
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
                  <h1><b>Yayyyy!</b></h1><h3>Your article has been published</h3>
                  <br/>
                  <br/>
                  <button type="button" className="btn btn-default btn-block btn-lg" data-dismiss="modal">That's great</button>
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
