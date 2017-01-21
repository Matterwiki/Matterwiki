import React from 'react';
import {Link} from 'react-router';
import Loader from './loader';
import BrowseArchives from './browse_archives';
import SimpleArticle from './simple_article';

class ArticleHistory extends React.Component {

  constructor(props) {
    super(props);
    this.archiveUpdate = this.archiveUpdate.bind(this);
    this.state = {archive_id: "", loading: true};
  }

  componentDidMount() {
    this.setState({loading: false});
  }


  archiveUpdate(id) {
    this.setState({archive_id: id});
  }

  render () {
    if(this.state.loading)
      return <Loader/>;
    else
      return(
        <div className="row">
          <div className="col-md-3">
            <label>Archives</label>
          <BrowseArchives archiveChange={this.archiveUpdate} articleId={this.props.params.articleId} />
          </div>
          <div className="col-md-9">
            <label>View Article</label>
          <SimpleArticle archiveId={this.state.archive_id} />
          </div>
        </div>
            );
  }
}

export default ArticleHistory;
