import React from 'react';
import {Link} from 'react-router';
import Loader from './loader.jsx';
import Alert from 'react-s-alert';

import WikiEditor from './WikiEditor/index.jsx';

class SimpleArticle extends React.Component {
  constructor(props) {
    super(props);
    this.state = { article: {}};
  }

  render () {
    console.log(this.props);
    if(this.props.loading)
        return <Loader />
    if(this.props.article && this.props.article.user) {
      return(<div className="row">
          <div className="col-md-12">
            <div className="article-heading">
                <h1 className="single-article-title">{this.props.article.title}
                </h1>
                <div className="single-article-meta">
                  Edited by <b>{this.props.article.user.name}</b>
              </div>
            </div>
            <div className="single-article-body">
              <WikiEditor
                readOnly={true}
                rawContent={this.props.article.body || JSON.parse(this.props.article.body_json)}
                isHtml={this.props.isHtml}
                />
            </div>
          </div>
          </div>
            );
    }
    else {
      return <center><p className="help-block">Please select the archive</p></center>;
    }
  }
}

export default SimpleArticle;
