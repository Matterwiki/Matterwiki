import styled from "styled-components";
import "assets/css/milligram.scss";

const Button = styled.button`
  width: ${props => (props.block ? "100%" : "auto")};
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-size: ${props => (props.small ? "1.2rem" : "1.4rem")};
  padding: ${props => (props.small ? "0 1rem" : "")};
  height: ${props => (props.small ? "3rem" : "")};
  line-height: ${props => (props.small ? "3rem" : "")};
  font-family: inherit;
  background-color: #ff0066;
  border: 0.1rem solid #ff0066;
  border-radius: 0.4rem;
  color: #ffffff;
  cursor: pointer;
  display: inline-block;
  font-size: 1.1rem;
  font-weight: 700;
  height: 4rem;
  letter-spacing: 0.1rem;
  line-height: 4rem;
  padding: 0 3rem;
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
