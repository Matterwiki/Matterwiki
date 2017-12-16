import styled from "styled-components";

const ImageWrapper = styled.div`
  img {
    width: ${props => (props.width ? props.width : "")}px;
    height: ${props => (props.height ? props.height : "")}rem;
    margin-bottom: 0.5rem;
    margin-top: 0.5rem;
    padding: 0.5rem;
  }
`;

export default ImageWrapper;
