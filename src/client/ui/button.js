import styled from "styled-components";

const Button = styled.button`
  width: ${props => (props.block ? "100%" : "auto")};
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-size: ${props => (props.small ? "1.2rem" : "1.4rem")};
  padding: ${props => (props.small ? "0 1rem" : "0 3rem")};
  height: ${props => (props.small ? "3rem" : "4rem")};
  line-height: ${props => (props.small ? "3rem" : "4rem")};
  font-family: inherit;
  background-color: #ff0066;
  border: 0.1rem solid #ff0066;
  border-radius: 0.4rem;
  color: #ffffff;
  cursor: pointer;
  font-weight: 700;
  letter-spacing: 0.1rem;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  white-space: nowrap;

  &:focus,
  &:hover {
    background-color: #da045a;
    border-color: #da045a;
    color: #ffffff;
    outline: 0;
  }

  &[disabled] {
    cursor: default;
    opacity: 0.5;

    &:focus,
    &:hover {
      background-color: #ff0066;
      border-color: #ff0066;
    }
  }

  ${props =>
    props.outline
      ? `
    background-color: transparent;
    color: #ff0066;

    &:focus,
    &:hover {
      background-color: transparent;
      border-color: #da045a;
      color: #da045a;
    }

    &[disabled] {
      &:focus,
      &:hover {
        border-color: inherit;
        color: #ff0066;
      }
  }`
      : ""} ${props =>
      props.clear
        ? `
  background-color: transparent;
    border-color: transparent;
    color: #ff0066;

    &:focus,
    &:hover {
      background-color: transparent;
      border-color: transparent;
      color: #da045a;
    }

    &[disabled] {
      &:focus,
      &:hover {
        color: #ff0066;
      }
    }
  `
        : ""};
`;

export default Button;
