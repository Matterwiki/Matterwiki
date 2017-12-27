import styled from "styled-components";

const ImageWrapper = styled.div`
  img {
    width: ${props => (props.width ? props.width : "")}px;
    height: ${props => (props.height ? props.height : "")}rem;
    margin-bottom: 1rem;
    margin-top: 1rem;
    padding: 0.6rem;
  }
`;

export default ImageWrapper;
