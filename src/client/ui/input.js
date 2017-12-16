import styled from "styled-components";

const Input = styled.input`
  background-color: ${props => (props.background ? props.background : "")};
`;

export default Input;
