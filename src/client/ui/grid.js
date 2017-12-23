import styled from "styled-components";

const Row = styled.div.attrs({
  className: "row"
})`
  margin-top: ${props => (props.marginTop ? `${props.marginTop}rem` : "")};
  margin-bottom: ${props => (props.marginBottom ? `${props.marginBottom}rem` : "")} .column {
    margin-bottom: 0.5rem;
  }
`;

const Col = styled.div.attrs({
  className: props => {
    let className = "column ";
    if (props.width) {
      className += `column-${props.width}`;
    }
    if (props.offset) {
      className += `column-offset-${props.offset}`;
    }
    return className;
  }
})`
  position: ${props => (props.fixed ? "fixed" : "")};
  text-align: ${props => (props.textAlign ? props.textAlign : "")};
  flex: ${props => (props.width ? `0 0 ${props.width}%` : "")};
  max-width: ${props => (props.width ? `${props.width}%` : "")};
`;

export { Row, Col };
