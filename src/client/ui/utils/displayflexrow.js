import styled from "styled-components";

const DisplayFlexRow = styled.div`
  display: flex;
  width: 100%;
  align-items: ${props => (props.alignItems ? props.alignItems : "")};
  flex-direction: row;
`;

export default DisplayFlexRow;
