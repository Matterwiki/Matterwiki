/* eslint-disable */
import { injectGlobal } from "styled-components";

injectGlobal`
  @import url('https://fonts.googleapis.com/css?family=Lato');  
  /* Set box-sizing globally to handle padding and border widths */
  *,
  *:after,
  *:before {
    box-sizing: inherit;
  }
  /* Setting base font size for easier rem calculations */
  html {
    box-sizing: border-box;
    font-size: 8px;
  }
  body {
    padding-top: 6rem;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #4d4d4d;
    font-family: "Lato", "Helvetica Neue", "Helvetica", "Arial", sans-serif;
    font-size: 1.4em;
    letter-spacing: 1px;
    line-height: 1.6;
  }
  /* Hides the default dotted outline on firefox and the blue on chrome */
  :focus {outline:none;}
  ::-moz-focus-inner {border:0;}

  
  /* Typography styles */
  b,
  strong {
    font-weight: bold;
  }

  p {
    margin-top: 0;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: 300;
    margin-bottom: 2rem;
    margin-top: 0;
  }

  h1 {
    font-size: 4.6rem;
    line-height: 1.2;
  }

  h2 {
    font-size: 3.6rem;
    line-height: 1.25;
  }

  h3 {
    font-size: 2.8rem;
    line-height: 1.3;
  }

  h4 {
    font-size: 2.2rem;
    line-height: 1.35;
  }

  h5 {
    font-size: 1.8rem;
    line-height: 1.5;
  }

  h6 {
    font-size: 1.6rem;
    line-height: 1.4;
  }


  .icon {
    margin-right: 0.5rem;
  }
`;
