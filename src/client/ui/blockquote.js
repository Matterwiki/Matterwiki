import styled from "styled-components";

const Blockquote = styled.blockquote`
  border-left: 0.3rem solid ${props => (props.theme ? props.theme.secondaryBackground : "#efefef")};
  margin-left: 0;
  margin-right: 0;
  padding: 1rem 1.5rem;

  *:last-child {
    margin-bottom: 0;
  }
`;

export default Blockquote;
