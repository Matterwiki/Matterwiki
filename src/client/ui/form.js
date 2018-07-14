import styled from "styled-components";

const Form = styled.form`
  margin-bottom: ${props => (props.marginBottom ? `${props.marginBottom}rem` : "")};
  width: 100%;
`;

export default Form;
