import styled from "styled-components";

const Footer = styled.footer`
  text-align: ${props => (props.align ? props.align : "left")};
`;

export default Footer;
