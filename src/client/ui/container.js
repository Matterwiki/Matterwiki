import styled from "styled-components";

const Container = styled.div`
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  width: ${props => (props.width ? props.width : "100")}%;
  text-align: ${props => (props.textAlign ? props.textAlign : "left")};
  margin-top: 2rem;
  max-width: ${props => (props.maxWidth ? props.maxWidth : "130rem")};
  min-height: ${props => (props.minHeight ? props.minHeight : "")};
`;

export default Container;
