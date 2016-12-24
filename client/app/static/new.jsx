import React from 'react';
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

  grow_input(element) {
    console.log(element);
    element.style.height = "5px";
    element.style.height = (element.scrollHeight)+"px";
  }

  render() {
    return (
      <div className="new-article">
        <div className="row">
          <div className="col-md-6">
            <input
              type="text"
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
