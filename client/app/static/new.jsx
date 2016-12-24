import React from 'react';
import autosize from 'autosize';
var Remarkable = require('remarkable');


class NewArticle extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {title: "", body: ""};
  }

  handleChange() {
    this.setState({title: this.refs.title.value, body: this.refs.body.value});
  }

  getRawMarkupBody() {
    var md = new Remarkable();
    return { __html: md.render(this.state.body) };
  }

  getRawMarkupTitle() {
    var md = new Remarkable();
    return { __html: md.render(this.state.title) };
  }

  componentDidMount() {
    autosize(document.querySelectorAll('textarea'));
  }

  render() {
    return (
      <div className="new-article">
        <div className="row">
          <div className="col-md-6 new-article-form">
            <textarea
              ref="title"
              className="form-control input-title"
              onChange={this.handleChange}
              placeholder="Enter article title..."
               />
            <textarea
              onChange={this.handleChange}
              ref="body"
              className="form-control input-body"
              placeholder="Start writing here..."
               />
          </div>
          <div className="col-md-6">
            <div className="article-heading">
              <span className="color-text">Preview</span>

            <div
              className="preview-title single-article-title"
              dangerouslySetInnerHTML={this.getRawMarkupTitle()}
            />
          </div>
            <div
              className="preview-body single-article-body"
              dangerouslySetInnerHTML={this.getRawMarkupBody()}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default NewArticle;
