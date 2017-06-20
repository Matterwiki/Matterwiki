import React from 'react';
import Alert from "react-s-alert";

import './NotificationsWrapper.css';

import 'react-s-alert/dist/s-alert-css-effects/slide.css';

class NotificationsWrapper extends React.Component {

  render () {
    return (
      <Alert stack={{ limit: 3 }} timeout={2000} position='bottom-right' effect='slide'/>
    );
  }

}

export default NotificationsWrapper;
