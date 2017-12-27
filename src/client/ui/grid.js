import styled from "styled-components";

const Row = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0;
  width: 100%;
  margin-left: -1rem;
  width: calc(100% + 2rem);
  margin-top: ${props => (props.marginTop ? `${props.marginTop}rem` : "")};
  margin-bottom: ${props => (props.marginBottom ? `${props.marginBottom}rem` : "")};
  .column {
    margin-bottom: 0.5rem;
  }
  &.row-no-padding {
    padding: 0;

    & > .column {
      padding: 0;
    }
  }
  &.row-wrap {
    flex-wrap: wrap;
  }
`;

const Col = styled.div`
  display: block;
  /* IE 11 required specifying the flex-basis otherwise it breaks mobile */
  flex: 1 1 auto;
  margin-left: 0;
  max-width: 100%;
  margin-bottom: inherit;
  padding: 0 1rem;
  width: 100%;
  position: ${props => (props.fixed ? "fixed" : "")};
  text-align: ${props => (props.textAlign ? props.textAlign : "")};
  flex: ${props => (props.width ? `0 0 ${props.width}%` : "")};
  max-width: ${props => (props.width ? `${props.width}%` : "")};
  margin-left: ${props => (props.offset ? `${props.offset}%` : "")};
`;

export { Row, Col };
