import React from "react";
import styled from "styled-components";

import "assets/css/milligram.scss";

const ButtonWrapper = styled.button.attrs({
  className: "button"
})`

`;

const Button = props => {
  const onClick = props.onClick;
  return (
    <ButtonWrapper onClick={onClick} role="button" tabIndex={0}>
      {props.children}
    </ButtonWrapper>
  );
};

export default Button;
