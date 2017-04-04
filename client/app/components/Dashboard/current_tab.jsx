import React from 'react';
import {Link} from 'react-router';

import LogoUpload from './logo_upload.jsx';
import Topics from './Topics/index.jsx';
import Users from './Users/index.jsx';

class CurrentTab extends React.Component {

  render () {

      if(this.props.tab=="users")

        return <Users />

      else if(this.props.tab=="topics")

        return <Topics />

      else

        return <LogoUpload />
  }

}

export default CurrentTab;
