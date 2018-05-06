import styled from "styled-components";

const DisplayFlexRow = styled.div`
  display: flex;
  width: 100%;
  align-items: ${props => (props.alignItems ? props.alignItems : "")};
  flex-direction: row;
  justify-content: ${props => (props.justifyContent ? props.justifyContent : "")};
  margin-top: ${props => (props.marginTop ? `${props.marginTop}rem` : "")};
  margin-bottom: ${props => (props.marginBottom ? `${props.marginBottom}rem` : "")};
  margin-right: ${props => (props.marginRight ? `${props.marginRight}rem` : "")};
  margin-left: ${props => (props.marginLeft ? `${props.marginLeft}rem` : "")};
`;

export default DisplayFlexRow;
