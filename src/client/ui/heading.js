import styled from "styled-components";

const Heading = styled.div`
  font-size: ${props => (props.size ? `${props.size}rem` : "inherit")};
  text-transform: ${props => (props.transform ? props.transform : "")};
  margin-bottom: 1rem;
`;

export default Heading;
