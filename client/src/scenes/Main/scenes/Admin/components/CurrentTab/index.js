import React from "react";

import LogoUpload from "./components/LogoUpload.js";
import Topics from "./components/Topics/index.js";
import Users from "./components/Users/index.js";

const CurrentTab = props => {
  const { tab } = props;

  if (tab === "users") return <Users />;
  else if (tab === "topics") return <Topics />;
  else return <LogoUpload />;
};

export default CurrentTab;
