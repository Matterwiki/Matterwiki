import styled from "styled-components";
import "assets/css/milligram.scss";

const Button = styled.button.attrs({
  className: props => {
    const outlineClass = props.outline ? "button-outline" : "";
    const clearClass = props.clear ? "button-clear" : "";
    const defaultClass = "button";
    return `${defaultClass} ${outlineClass} ${clearClass}`;
  }
})`
  width: ${props => (props.block ? "100%" : "auto")};
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-size: ${props => (props.small ? "1rem" : "1.3rem")};
  padding: ${props => (props.small ? "0 1rem" : "")};
  height: ${props => (props.small ? "3rem" : "")};
  line-height: ${props => (props.small ? "3rem" : "")};
  font-weight: 300;
`;

export default Button;
