import styled from "styled-components";

const Row = styled.div.attrs({
  className: "row"
})`
  .column {
    margin-bottom: 0.5rem;
  }
`;

const Col = styled.div.attrs({
  className: "column"
})`
`;

export { Row, Col };
