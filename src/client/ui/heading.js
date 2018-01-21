import styled from "styled-components";

const Heading = styled.div`
  font-size: ${props => (props.size ? `${props.size}rem` : "inherit")};
  text-transform: ${props => (props.transform ? props.transform : "")};
  margin-bottom: 1rem;
  font-weight: 700;
  border-bottom: ${props => (props.borderBottom ? `1px solid` : "")};
  padding-bottom: 1rem;
  letter-spacing: 1px;
  display: flex;
  align-items: center;
  justify-content: flex-start;

  .icon {
    margin-right: 0.5rem;
  }
`;

export default Heading;
