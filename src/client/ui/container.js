import styled, { css } from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: ${props => (props.column ? "column" : "row")};
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  width: ${props => (props.width ? props.width : "100")}%;
  text-align: ${props => (props.textAlign ? props.textAlign : "left")};
  max-width: ${props => (props.maxWidth ? props.maxWidth : "130rem")};
  min-height: ${props => (props.minHeight ? props.minHeight : "")};
  ${props =>
    props.column
      ? css`
          align-items: ${props.center ? "center" : "flex-start"};
        `
      : css`
          justify-content: ${props.center ? "center" : "flex-start"};
        `};
  margin-bottom: ${props => `${props.marginBottom}rem`};
`;

export default Container;
