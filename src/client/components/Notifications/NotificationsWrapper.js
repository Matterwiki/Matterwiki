import React from "react";
import Alert from "react-s-alert";

import "react-s-alert/dist/s-alert-css-effects/slide.css";
import "./NotificationsWrapper.css";

const NotificationsWrapper = () => (
  <Alert stack={{ limit: 3 }} timeout={2000} position="bottom-right" effect="slide" />
);

export default NotificationsWrapper;
