import React from "react";
import { ButtonGroup } from "react-bootstrap";
import { FaIndent, FaDedent } from "react-icons/lib/fa";
import ToolbarButton from "../ToolbarButton";
import getDisabledLevelButtons from "./utils/getDisabledLevelButtons";

const LevelControls = ({ editorState, toggleLevelType }) => {
  const onDecreaseLevel = () => toggleLevelType(-1);
  const onIncreaseLevel = () => toggleLevelType(1);
  const { disableOutdent, disableIndent } = getDisabledLevelButtons(editorState);

  return (
    <ButtonGroup>
      <ToolbarButton
        onToggle={onDecreaseLevel}
        disabled={disableOutdent}
        label="Decrease Level"
        styleName="outdent"
        fa={FaDedent}
      />
      <ToolbarButton
        onToggle={onIncreaseLevel}
        disabled={disableIndent}
        label="Increase Level"
        styleName="indent"
        fa={FaIndent}
      />
    </ButtonGroup>
  );
};

export default LevelControls;
