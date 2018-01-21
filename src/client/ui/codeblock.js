import styled from "styled-components";
import { lighten } from "polished";

const CodeBlock = styled.code`
  background: ${props => (props.theme ? lighten(0.2, props.theme.border) : "transparent")};
  border-radius: 0.4rem;
  font-size: 86%;
  margin: 0 0.2rem;
  padding: 0.2rem 0.5rem;
  white-space: nowrap;
`;

export default CodeBlock;
