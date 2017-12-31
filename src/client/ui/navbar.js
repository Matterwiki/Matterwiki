import styled, { css } from "styled-components";

const Navbar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: #fff;
  max-height: 6rem;
  box-shadow: 0rem 0.1rem 1rem #d1d1d1;
  padding: 0 3rem;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
  border-top: 0.4rem solid #ff0066;
  a {
    height: 100%;
    color: inherit;
  }
  a:hover {
    color: #ff0066;
  }
`;

const Nav = styled.div`
  display: flex;
  flex-direction: ${props => (props.vertical ? "column" : "row")};
  justify-content: ${props => {
    if (props.pull && props.pull === "right") {
      return "flex-end";
    }
    return "flex-start";
  }};
  width: 100%;
  margin-bottom: ${props => (props.marginBottom ? `${props.marginBottom}rem` : "")};
`;

const NavItem = styled.div`
  margin-top: 0.8rem;
  margin-bottom: 0.8rem;
  height: 4rem;
  max-height: 4rem;
  display: flex;
  justify-content: ${props => {
    if (props.pull && props.pull === "right") {
      return "flex-end";
    }
    return "flex-start";
  }};
  width: ${props => (props.fullWidth ? "100%" : "")};
  margin-left: ${props => (props.marginLeft ? props.marginLeft : "3rem")};
  padding: ${props => (props.tab ? "1rem 2rem" : "")};
  border: ${props => (props.tab ? `1px solid #d1d1d1` : "")};
  border-bottom: ${props => (props.tab && props.active ? "none" : "")};
  background-color: ${props => {
    if (props.tab) {
      if (props.active) {
        return "#fff";
      }
      return "#f6f6f6";
    }
    return "";
  }};
  cursor: ${props => (props.cursorPointer ? "pointer" : "")};
  width: ${props => (props.tab ? "100%" : "")};
  .icon {
    margin-right: 0.5rem;
  }
  form,
  input {
    margin-bottom: 0rem;
  }
  a {
    display: flex;
    font-size: 1.4rem;
    line-height: 4rem;
    text-transform: uppercase;
    justify-content: flex-start;
    align-items: center;
  }
`;

const NavForm = styled.form`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const NavCollapse = styled.div`
  ${props =>
    props.isOpen
      ? css`
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          position: absolute;
          top: 5rem;
          left: 0;
          right: 0;
          background-color: #fff;
          padding: 1rem;
          box-shadow: 0rem 2rem 3rem -2rem #d1d1d1;
        `
      : ""};
  display: ${props => (props.isOpen ? "flex" : "none")};
`;

export { Navbar, Nav, NavItem, NavForm, NavCollapse };
