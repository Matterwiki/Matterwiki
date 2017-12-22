import React from "react";
import { ControlLabel, FormControl, HelpBlock } from "react-bootstrap";

const WhatChanged = ({ value, onChange }) => (
  <div>
    <ControlLabel>What improvements did you make in this edit?</ControlLabel>
    <FormControl
      componentClass="textarea"
      className="what_changed"
      name="change_log"
      placeholder="Example: Fixed a typo. It's grammer not grammar"
      value={value}
      onChange={onChange}
    />
    <HelpBlock>Keep it short and descriptive :)</HelpBlock>
  </div>
);

export default WhatChanged;
