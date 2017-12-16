import styled from "styled-components";

const Row = styled.div.attrs({
  className: "row"
})`
  margin-top: ${props => (props.marginTop ? `${props.marginTop}rem` : "")};
  margin-bottom: ${props =>
    props.marginBottom ? `${props.marginBottom}rem` : ""}
  .column {
    margin-bottom: 0.5rem;
  }
`;

const Col = styled.div.attrs({
  className: props => (props.width ? `column column-${props.width}` : "column")
})`
`;

export { Row, Col };
