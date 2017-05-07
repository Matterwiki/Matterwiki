import React from "react";

import LogoUpload from "./LogoUpload.js";
import Topics from "./Topics/index.js";
import Users from "./Users/index.js";

const CurrentTab = props => {
  const { tab } = props;

  if (tab === "users") return <Users />;
  else if (tab === "topics") return <Topics />;
  else return <LogoUpload />;
};

export default CurrentTab;
