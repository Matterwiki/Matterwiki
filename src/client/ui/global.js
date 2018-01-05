/* eslint-disable */
import { injectGlobal } from "styled-components";
import { lighten } from "polished";
import theme from "./theme";

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
    color: ${theme ? theme.font : "#4d4d4d"};
    font-family: "Lato", "Helvetica Neue", "Helvetica", "Arial", sans-serif;
    font-size: 1.4em;
    letter-spacing: 1px;
    line-height: 1.6;
    overflow-x: hidden;
    background: ${theme ? theme.background : "#fff"}
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

  a {
    color: ${theme ? theme.primary : "#ff0066"};
    text-decoration: none;

    &:focus,
    &:hover {
      color: ${theme ? lighten(0.1, theme.primary) : lighten(0.1, "#ff0066")};;
    }
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

  dl,
  ol,
  ul {
    list-style: none;
    margin-top: 0;
    padding-left: 0;

    dl,
    ol,
    ul {
      font-size: 90%;
      margin: 1.5rem 0 1.5rem 3rem;
    }
  }

  ol {
    list-style: decimal inside;
  }

  ul {
    list-style: circle inside;
  }

  button,
  dd,
  dt,
  li {
    margin-bottom: 1rem;
  }

  fieldset,
  input,
  select,
  textarea {
    margin-bottom: 1rem;
  }

  blockquote,
  dl,
  figure,
  form,
  ol,
  p,
  pre,
  table,
  ul {
    margin-bottom: 2rem;
  }

  input[type='email'],
  input[type='number'],
  input[type='password'],
  input[type='search'],
  input[type='tel'],
  input[type='text'],
  input[type='url'],
  textarea,
  select {
    border: 0.1rem solid ${theme ? theme.border : "#d1d1d1"};
    border-radius: 0.4rem;
    box-shadow: none;
    box-sizing: inherit;
    height: 4rem;
    padding: 0.6rem 1rem;
    width: 100%;
    background: inherit;

    &:focus {
      border-color: ${theme ? theme.primary : "#ff0066"};
      outline: 0;
    }
  }

  textarea {
    min-height: 6.5rem;
  }

  label,
  legend {
    display: block;
    font-size: 1.6rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
  }

  fieldset {
    border-width: 0;
    padding: 0;
  }

  input[type='checkbox'],
  input[type='radio'] {
    display: inline;
  }

  .label-inline {
    display: inline-block;
    font-weight: normal;
    margin-left: 0.5rem;
  }


  table {
    border-spacing: 0;
    width: 100%;
  }

  td,
  th {
    border-bottom: 0.1rem solid ${theme ? theme.border : "#d1d1d1"};
    padding: 1.2rem 1.5rem;
    text-align: left;

    &:first-child {
      padding-left: 0;
    }

    &:last-child {
      padding-right: 0;
    }
  }


  .icon {
    margin-right: 0.5rem;
  }
`;
