/* eslint-disable no-shadow */
import styled, { css } from "styled-components";
import { lighten } from "polished";

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
  background-color: ${props => (props.theme ? props.theme.primary : "#ff0066")};
  border: 0.1rem solid ${props => (props.theme ? props.theme.primary : "#ff0066")};
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
    background-color: ${props =>
      props.theme ? lighten(0.1, props.theme.primary) : lighten(0.1, "#ff0066")};
    border-color: ${props =>
      props.theme ? lighten(0.1, props.theme.primary) : lighten(0.1, "#ff0066")};
    color: #ffffff;
    outline: 0;
  }

  &[disabled] {
    cursor: default;
    opacity: 0.5;

    &:focus,
    &:hover {
      background-color: ${props => (props.theme ? props.theme.primary : "#ff0066")};
      border-color: ${props => (props.theme ? props.theme.primary : "#ff0066")};
    }
  }

  ${props =>
    props.outline
      ? css`
          background-color: transparent;
          color: ${props => (props.theme ? props.theme.primary : "#ff0066")};

          &:focus,
          &:hover {
            background-color: transparent;
            border-color: ${props =>
              props.theme ? lighten(0.1, props.theme.primary) : lighten(0.1, "#ff0066")};
            color: ${props =>
              props.theme ? lighten(0.1, props.theme.primary) : lighten(0.1, "#ff0066")};
          }

          &[disabled] {
            &:focus,
            &:hover {
              border-color: inherit;
              color: ${props => (props.theme ? props.theme.primary : "#ff0066")};
            }
          }
        `
      : ""} ${props =>
    props.clear
      ? css`
          background-color: transparent;
          border-color: transparent;
          color: ${props => (props.theme ? props.theme.primary : "#ff0066")};

          &:focus,
          &:hover {
            background-color: transparent;
            border-color: transparent;
            color: ${props =>
              props.theme ? lighten(0.1, props.theme.primary) : lighten(0.1, "#ff0066")};
          }

          &[disabled] {
            &:focus,
            &:hover {
              color: ${props => (props.theme ? props.theme.primary : "#ff0066")};
            }
          }
        `
      : ""};
`;

export default Button;
