import React from 'react';
import autosize from 'autosize';
var Remarkable = require('remarkable');


class NewArticle extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {body: ""};
  }

  handleChange() {
    this.setState({body: this.refs.body.value});
  }

  getRawMarkupBody() {
    var md = new Remarkable();
    return { __html: md.render(this.state.body) };
  }


  componentDidMount() {
    autosize(document.querySelectorAll('textarea'));
  }

  render() {
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
          <button className="btn btn-default btn-block btn-lg" >Create Article</button>
        </div>
      </div>
    </div>
    );
  }
}

export default NewArticle;
