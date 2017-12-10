import styled from "styled-components";

const ImageWrapper = styled.div`
  img {
    width: ${props => (props.width ? props.width : "")}px;
    height: ${props => (props.height ? props.height : "")}px;
    margin-bottom: 1rem;
    margin-top: 1rem;
    padding: 0.5rem;
  }
`;

export default ImageWrapper;
