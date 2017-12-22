import styled from "styled-components";

const Input = styled.input`
  background-color: ${props => (props.background ? props.background : "")};
  height: 4rem;
  font-family: inherit;
`;

export default Input;
