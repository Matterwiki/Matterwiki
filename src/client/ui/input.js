import styled from "styled-components";

const Input = styled.input`
  background-color: ${props => (props.background ? props.background : "")};
  height: 4rem;
  font-family: inherit;
  font-size: 1.6rem;
  ::-webkit-input-placeholder {
    /* Chrome/Opera/Safari */
    text-transform: uppercase;
    font-size: 1.4rem;
  }
  ::-moz-placeholder {
    /* Firefox 19+ */
    text-transform: uppercase;
    font-size: 1.4rem;
  }
  :-ms-input-placeholder {
    /* IE 10+ */
    text-transform: uppercase;
    font-size: 1.4rem;
  }
  :-moz-placeholder {
    /* Firefox 18- */
    text-transform: uppercase;
    font-size: 1.4rem;
  }
`;

export default Input;
