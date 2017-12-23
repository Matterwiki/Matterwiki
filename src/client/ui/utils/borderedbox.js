import styled from "styled-components";

const BorderedBox = styled.div`
  border: 0.1rem solid #d1d1d1;
  padding: 2rem;
  border-radius: 0.4rem;
  box-shadow: ${props => (props.shadow ? "0rem 1rem 3rem #d1d1d1" : "")};
`;

export default BorderedBox;
