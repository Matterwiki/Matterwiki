import React from "react";
import { ButtonToolbar } from "react-bootstrap";
import InlineControls from "./components/InlineControls";
import BlockControls from "./components/BlockControls";
import LevelControls from "./components/LevelControls/index";
import LinkControl from "./components/LinkControl";
import HistoryControls from "./components/HistoryControls";

const Toolbar = props => (
  <ButtonToolbar>
    <InlineControls {...props} />
    <LinkControl {...props} />
    <BlockControls {...props} />
    <LevelControls {...props} />
    <HistoryControls {...props} />
  </ButtonToolbar>
);

export default Toolbar;
