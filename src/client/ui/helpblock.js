import styled from "styled-components";

const HelpBlock = styled.div`
  color: inherit;
  opacity: 0.7;
  text-align: ${props => (props.textAlign ? props.textAlign : "left")};
`;

export default HelpBlock;
