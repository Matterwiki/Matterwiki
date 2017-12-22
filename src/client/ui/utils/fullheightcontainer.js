import styled from "styled-components";

const FullHeightContainer = styled.div`
  height: 80vh;
  ${props => {
    if (props.borderRight) {
      return `border-right: ${`1px solid #f6f6f6`}`;
      /* return `border-right: ${`1px solid ${props.borderRight}`}`; */
    } else if (props.borderLeft) {
      return `border-left: ${`1px solid ${props.borderLeft}`}`;
    }
    return ``;
  }};
`;

export default FullHeightContainer;
