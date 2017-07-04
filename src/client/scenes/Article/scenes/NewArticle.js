import React from "react";
import Alert from "react-s-alert";
import APIProvider from "utils/APIProvider";

import ArticleForm from "../components/ArticleForm/ArticleForm";

class NewArticle extends React.Component {
  handleSubmit = article => {
    APIProvider.post("articles", article).then(response => {
      Alert.success("Article has been successfully saved");
      this.props.history.push(`/article/${response.id}`);
    });
  };

  render() {
    return <ArticleForm onSubmit={this.handleSubmit} />;
  }
}

export default NewArticle;
