import React from "react";
import styled from "styled-components";
import { Editor } from "slate-react";
import { Value } from "slate";

import {
  BoldButton,
  ItalicButton,
  UnderlineButton,
  StrikeButton,
  LinkButton,
  CodeButton,
  BlockQuoteButton,
  HeaderButton,
  Header2Button,
  Header3Button,
  ListBulletButton,
  ListOrderedButton,
  CodeBlockButton
} from "ui/editor/toolbarButtons";

const EditorTitle = styled.input`
  font-size: 2.2em;
  width: 100%;
  padding: 0.5em 0 0.5em 0;
  margin: 0;
  border: none;
  border-bottom: 1px solid #eff1f4;
  color: #393e41;
`;

const EditorBody = styled.div`
  background-color: #f8f9fa;
  padding: 1.8em 0 1.8em 0;
`;

const EditorToolbar = styled.div``;

const BLOCK_TYPES = {
  blockQuote: "block-quote",
  headingOne: "heading-one",
  headingTwo: "heading-two",
  headingThree: "heading-three",
  numberedList: "numbered-list",
  bulletedList: "bulleted-list",
  code: "code"
};

// TODO Research compound components and see how these could be changed
class WikiEditor extends React.Component {
  // TODO Is this the right way to set this up?
  state = {
    value: Value.fromJSON({ document: { nodes: [] } })
  };

  markButtons = [
    { type: "bold", btn: BoldButton },
    { type: "italic", btn: ItalicButton },
    { type: "underline", btn: UnderlineButton },
    // TODO This might not work!!!
    { type: "strikethrough", btn: StrikeButton },
    { type: "code", btn: CodeButton },
    { type: "link", btn: LinkButton }
  ];

  blockButtons = [
    { type: "block-quote", btn: BlockQuoteButton },
    { type: "heading-one", btn: HeaderButton },
    { type: "heading-two", btn: Header2Button },
    { type: "heading-three", btn: Header3Button },
    { type: "numbered-list", btn: ListOrderedButton },
    { type: "bulleted-list", btn: ListBulletButton },
    { type: "code", btn: CodeBlockButton }
  ];

  onChange = ({ value }) => {
    this.setState({ value });
  };

  hasMark(type) {
    const { value } = this.state;
    return value.activeMarks.some(mark => mark.type === type);
  }

  hasBlock() {}

  onClickMark(evt, type) {
    evt.preventDefault();
    const { value } = this.state;
    const change = value.change().toggleMark(type);
    this.onChange(change);
  }

  onClickBlock(evt, type) {
    evt.preventDefault();
    const { value } = this.state;
    const { document } = value;

    if (type !== BLOCK_TYPES.bulletedList && type !== BLOCK_TYPES.numberedList) {
      console.log(1000);
    }
  }

  renderEditorToolBar() {
    return (
      <EditorToolbar>
        {this.markButtons.map(({ type, btn: Btn }) => {
          const onClick = e => this.onClickMark(e, type);
          const isActive = this.hasMark(type);

          return <Btn active={isActive} key={type} onClick={onClick} />;
        })}
        {this.blockButtons.map(({ type, btn: Btn }) => {
          const onClick = e => this.onClickBlock(e, type);
          const isActive = this.hasBlock(type);

          return <Btn active={isActive} key={type} onClick={onClick} />;
        })}
      </EditorToolbar>
    );
  }

  render() {
    return (
      <div>
        <EditorTitle placeholder="Enter article title*" required="true" />
        <EditorBody>{this.renderEditorToolBar()}</EditorBody>
      </div>
    );
  }
}

export default WikiEditor;
