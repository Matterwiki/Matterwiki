// This is based on the hidden-styled component by Brent Jackson (@jxnblk)
// https://github.com/jxnblk/hidden-styled (Licensed under MIT)
// Thank you Brent!

import styled from "styled-components";

export const breakpoints = {
  extraSmall: "@media screen and (max-width: 40em)",
  small: "@media screen and (min-width: 40em) and (max-width: 55em)",
  medium: "@media screen and (min-width: 55em) and (max-width: 64em)",
  large: "@media screen and (min-width: 64em)"
};

export const hidden = key => props =>
  props[key]
    ? {
        [breakpoints[key]]: {
          display: "none"
        }
      }
    : null;

export const extraSmall = hidden("extraSmall");
export const small = hidden("small");
export const medium = hidden("medium");
export const large = hidden("large");

const Hide = styled.span([], extraSmall, small, medium, large, {
  display: "inherit"
});

export default Hide;
