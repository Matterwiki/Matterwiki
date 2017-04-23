import React from "react";
import { Link } from "react-router";
import Loader from "Loader/loader.jsx";
import BrowseArchives from "./browse_archives.jsx";
import SimpleArticle from "./simple_article.jsx";
import API from "api/wrapper.js";

class ArticleHistory extends React.Component {
  constructor(props) {
    super(props);
    this.archiveUpdate = this.archiveUpdate.bind(this);
    this.state = {
      archives: [],
      article: {},
      loading: true,
      articleloading: false
    };
  }

  componentDidMount() {
    var that = this;
    API.call(
      "articles/" + this.props.params.articleId + "/history",
      "GET",
      window.localStorage.getItem("userToken")
    )
      .then(function(articles) {
        that.setState({ archives: articles.data, loading: false });
      })
      .catch(function(err) {
        //Alert.error(err)
      });
  }

  archiveUpdate(id) {
    this.setState({ articleloading: true });
    var that = this;
    API.call("archives/" + id, "GET", window.localStorage.getItem("userToken"))
      .then(function(archive) {
        that.setState({
          article: archive.data,
          isHtml: archive.data.body && !archive.data.body_json ? true : false,
          articleloading: false
        });
      })
      .catch(function(err) {
        //Alert.error(err)
      });
  }

  render() {
    if (this.state.loading) return <Loader />;
    else
      return (
        <div className="row">
          <div className="col-md-3">
            <label>Archives</label>
            <BrowseArchives
              archives={this.state.archives}
              archiveChange={this.archiveUpdate}
              articleId={this.props.params.articleId}
            />
          </div>
          <div className="col-md-9">
            <label>View Article</label>
            <SimpleArticle
              article={this.state.article}
              loading={this.state.articleloading}
              isHtml={this.state.isHtml}
            />
          </div>
        </div>
      );
  }
}

export default ArticleHistory;
