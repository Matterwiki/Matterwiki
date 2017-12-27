import styled from "styled-components";

const Clearfix = styled.div`
  &:after {
    clear: both;
    content: " ";
    display: table;
  }
`;

const FloatLeft = styled.div`
  float: left;
`;

const FloatRight = styled.div`
  float: right;
`;

export { Clearfix, FloatRight, FloatLeft };
