import { css } from "styled-components";

const breakpoints = {
  small: "@media screen and (max-width: 55em)",
  medium: "@media screen and (min-width: 55em) and (max-width: 64em)",
  large: "@media screen and (min-width: 64em)"
};

const sizes = {
  small: {
    min: 0,
    max: 55
  },
  medium: {
    min: 55,
    max: 64
  },
  large: {
    min: 64
  }
};

// Iterate through the sizes and create a media template
const media = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media screen and (min-width: ${sizes[label].min}em),
      @media screen and (max-width: ${sizes[label].max}em) {
      ${css(...args)};
    }
  `;

  return acc;
}, {});

breakpoints.css = media;

export default breakpoints;
