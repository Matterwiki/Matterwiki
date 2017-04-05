import React from 'react';
import Loader from './loader.jsx';
import {Link, hashHistory} from 'react-router';
import Alert from 'react-s-alert';

import styled from 'styled-components';

/*
  Define 'styled' components here, use them inside render.
  
  You don't need to worry about specificity, I see you have some
  classes called article-list and topic-list. As these components
  are scoped to this file, you can just call them List and Item
*/

const List = styled.div`
  padding: 10px 20px;
`;

/*
  The syntax can be a little scary at first because of these backticks ``
  They are template literals syntax from ES6: https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Template_literals
  
  The cool part about them is you can write CSS as CSS,
  not as javascripty properties
  
  Example: margin-bottom vs marginBottom
*/

const ListItem = styled.div`
  margin-bottom: 2.5em;
`;

/*
  Some components like Title can be reused, you can move these to
  a different file and import them wherever needed.
  You can even customize them a little if needed - 

  Example:
  
  import Title from '../library/title';
  const ArticleTitle = styled(Title)`
    font-weight: bold;
  `;
*/

const Title = styled.div`
  font-size: 2.5em;
  font-weight: 700;
  word-wrap: break-word;
  > a {
    color: #4d4d4d;
    &:hover {
      color: #ff0066;
    }
  }
`;

/*
  Now that you are using css-in-js, it opens up some options for you,
  like themeing support. Instead of hard coding colors you can also
  pull them for a theme file.
  
  Example:
  
  import {textColor} from '../themes/light';
  const Description = styled.div`
    color: ${textColor};
  `;
*/

const Description = styled.div`
  color: #a0a0a0;
`;


class BrowseArticles extends React.Component {
  constructor(props) {
    super(props);
    this.state = { articles: [], url: "/api/articles", loading: true};
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
    var url = '/api/articles';
    fetch(url,myInit)
    .then(function(response) {
      return response.json();
    })
    .then(function(response) {
      if(response.error.error)
        Alert.error(response.error.message);
      else {
        that.setState({articles: response.data})
      }
      that.setState({loading: false});
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({loading: true});
    var myHeaders = new Headers({
        "Content-Type": "application/x-www-form-urlencoded",
        "x-access-token": window.localStorage.getItem('userToken')
    });
    var myInit = { method: 'GET',
               headers: myHeaders,
               };
    var that = this;
    var url = '/api/articles';
    if(nextProps.topicId==null && this.props.topicId==null)
      var url = '/api/articles';
    else
      var url = '/api/topic/'+nextProps.topicId+'/articles';
    fetch(url,myInit)
    .then(function(response) {
      return response.json();
    })
    .then(function(response) {
      if(response.error.error)
        Alert.error(response.error.message);
      else {
        that.setState({articles: response.data})
      }
      that.setState({loading: false});
    });
  }
  render () {
    if(this.state.loading)
      return <Loader/>;
    if(this.state.articles.length<1) {
      return <p className="help-block center-align">There are no articles under this topic</p>;
    }
    else {
      /*
        The jsx here is much more readable because it has the component name
        instead of a div with a className
      */
      return(<div>
          <List>
            {this.state.articles.map(article => (
            <ListItem key={article.id}>
              <Title>
                <Link to={"/article/"+article.id} >{article.title}</Link>
              </Title>
              <Description>
                Last updated on {new Date(article.updated_at.replace(' ','T')).toDateString()}
              </Description>
              <hr className="article-separator"></hr>
            </ListItem>
            ))}
          </List>
      </div>);
    }
  }
}

export default BrowseArticles;
