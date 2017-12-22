import React from "react";
import feather from "feather-icons";

const Icon = props => {
  const { type, color } = props;
  console.log(feather.icons[type].toSvg());
  return (
    <span
      className="icon"
      dangerouslySetInnerHTML={{ __html: feather.icons[type].toSvg() }}
    />
  );
};

export default Icon;
