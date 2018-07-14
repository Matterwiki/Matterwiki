import styled from "styled-components";

const ImageWrapper = styled.div`
  img {
    width: ${props => (props.width ? props.width : "")}px;
    height: ${props => (props.height ? props.height : "")}rem;
    padding: 0.8rem;
  }
`;

export default ImageWrapper;
