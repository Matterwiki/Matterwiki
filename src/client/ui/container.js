import styled from "styled-components";

const Container = styled.div.attrs({
  className: "container"
})`
  width: ${props => (props.width ? props.width : "100")}%;
  text-align: ${props => (props.textAlign ? props.textAlign : "left")};
  margin-top: 2rem;
`;

export default Container;
