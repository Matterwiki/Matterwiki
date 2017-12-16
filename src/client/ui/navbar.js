import styled from "styled-components";

const Navbar = styled.div`
  display: flex;
  flex-direction: row;
  background-color: #fff;
  max-height: 6rem;
  box-shadow: 0px 17px 12px -24px #000;
  padding: 0 3rem;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
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
  margin-bottom: ${props =>
    props.marginBottom ? `${props.marginBottom}rem` : ""};
`;

const NavItem = styled.div`
  margin-top: 1rem;
  margin-bottom: 1rem;
  height: 4rem;
  max-height: 4rem;
  margin-left: ${props => (props.tab ? "0rem" : "2rem")};
  padding: ${props => (props.tab ? "1rem 2rem" : "")};
  border: ${props => (props.tab ? `1px solid #d1d1d1` : "")};
  border-bottom: ${props => (props.tab && props.active ? "none" : "")};
  background-color: ${props => {
    if (props.tab) {
      if (props.active) {
        return "#fff";
      }
      return "#efefef";
    }
    return "";
  }};
  cursor: ${props => (props.cursorPointer ? "pointer" : "")};
  width: ${props => (props.tab ? "100%" : "")};
  a {
    display: block;
    display: block;
    font-size: 1.4rem;
    line-height: 4rem;
    text-transform: uppercase;
  }
  * {
    height: 100%;
  }
`;

const NavForm = styled.form`
  display: flex;
  flex-direction: row;
  input,
  button,
  a {
    height: 100%;
  }
`;

export { Navbar, Nav, NavItem, NavForm };
