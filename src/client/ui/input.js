import styled from "styled-components";

const Input = styled.input`
  background-color: ${props => (props.background ? props.background : "")};
  height: 4rem;
  font-family: inherit;
  font-size: 1.3rem;
  ::-webkit-input-placeholder {
    /* Chrome/Opera/Safari */
    text-transform: uppercase;
  }
  ::-moz-placeholder {
    /* Firefox 19+ */
    text-transform: uppercase;
  }
  :-ms-input-placeholder {
    /* IE 10+ */
    text-transform: uppercase;
  }
  :-moz-placeholder {
    /* Firefox 18- */
    text-transform: uppercase;
  }
`;

export default Input;
