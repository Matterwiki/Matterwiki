// This is based on the hidden-styled component by Brent Jackson (@jxnblk)
// https://github.com/jxnblk/hidden-styled (Licensed under MIT)
// Thank you Brent!

import styled from "styled-components";
import breakpoints from "./breakpoints";

export const hidden = key => props =>
  props[key]
    ? {
        [breakpoints[key]]: {
          display: "none"
        }
      }
    : null;

export const small = hidden("small");
export const medium = hidden("medium");
export const large = hidden("large");

const Hide = styled.span([], small, medium, large, {
  display: "inherit"
});

const Hid = styled.span`
  display: inherit;
  ${breakpoints.css.small`
    display: ${props => (props.small ? "none" : "")};
  `};
  ${breakpoints.css.medium`
    display: ${props => (props.medium ? "none" : "")};
  `};
  ${breakpoints.css.large`
    display: ${props => (props.large ? "none" : "")};
  `};
`;

export default Hide;
