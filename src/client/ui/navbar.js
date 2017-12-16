import styled from "styled-components";

const Navbar = styled.div`
  display: flex;
  flex-direction: row;
  background-color: #fff;
  max-height: 6rem;
  border-bottom: 1px solid #ccc;
  box-shadow: 0px 17px 12px -24px #000;
  padding: 0 5rem;
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
`;

const NavItem = styled.div`
  margin-top: 1rem;
  margin-bottom: 1rem;
  height: 4rem;
  max-height: 4rem;
  margin-left: 2rem;
  a {
    padding: 0.5rem;
    display: block;
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
