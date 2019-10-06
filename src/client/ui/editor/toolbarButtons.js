import React from "react";
import styled from "styled-components";

import Icon from "ui/icon";

import quillIcons from "quill-icons";

const {
  Bold,
  Italic,
  Underline,
  Strike,
  Link,
  Code,
  Blockquote,
  Header,
  Header2,
  Header3,
  Header4,
  ListBullet,
  ListOrdered,
  CodeBlock
} = quillIcons;

// TODO Clean this up, use composition more!
const EditorButton = styled.button`
  background: transparent;
  border: none;
  color: #393e41;
  cursor: pointer;
  font-size: 2em;
  margin: 0 0.2em 0 0.2em;

  & .ql-stroke {
    stroke: ${props => (props.active ? "#ff0066" : "#000")};
    fill: transparent;
  }

  & .ql-stroke-mitter {
    stroke: ${props => (props.active ? "#ff0066" : "#000")};
    fill: transparent;
  }

  & .ql-fill {
    fill: ${props => (props.active ? "#ff0066" : "#000")};
  }

  & .ql-even {
    stroke: ${props => (props.active ? "#ff0066" : "#000")};
    fill: #fff;
  }

  & .ql-color-label {
    fill: red;
  }

  & .ql-transparent {
    opacity: 0.2;
  }

  & .ql-thin {
    stroke: ${props => (props.active ? "#ff0066" : "#000")};
    fill: transparent;
    stroke-width: 0.5;
  }

  :hover {
    & .ql-stroke {
      stroke: #ff0066;
      fill: transparent;
    }

    & .ql-stroke-mitter {
      stroke: #ff0066;
      fill: transparent;
    }

    & .ql-fill {
      fill: #ff0066;
    }

    & .ql-even {
      stroke: #ff0066;
      fill: #fff;
    }

    & .ql-color-label {
      fill: red;
    }

    & .ql-transparent {
      opacity: 0.2;
    }
    & .ql-thin {
      stroke: #ff0066;
      fill: transparent;
      stroke-width: 0.5;
    }
  }
`;

const btnProps = { width: 30, height: 30 };

const btnWrapper = BtnIcon => props => (
  <EditorButton {...props}>
    <BtnIcon {...btnProps} />
  </EditorButton>
);

export const BoldButton = btnWrapper(Bold);
export const ItalicButton = btnWrapper(Italic);
export const UnderlineButton = btnWrapper(Underline);
export const StrikeButton = btnWrapper(Strike);
export const LinkButton = btnWrapper(Link);
export const CodeButton = btnWrapper(Code);
export const BlockQuoteButton = btnWrapper(Blockquote);
export const HeaderButton = btnWrapper(Header);
export const Header2Button = btnWrapper(Header2);
export const Header3Button = btnWrapper(Header3);
export const Header4Button = btnWrapper(Header4);
export const ListBulletButton = btnWrapper(ListBullet);
export const ListOrderedButton = btnWrapper(ListOrdered);
export const CodeBlockButton = btnWrapper(CodeBlock);
