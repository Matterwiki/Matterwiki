import styled from "styled-components";

const List = styled.div`
  width: 100%;
  display: flex;
  cursor: ${props => (props.cursorPointer ? "pointer" : "")};
  flex-direction: column;
`;

const ListItem = styled.div`
  width: 100%;
  cursor: ${props => (props.cursorPointer ? "pointer" : "")};
  padding: 1rem;
  background-color: ${props => (props.active ? "#efefef" : "#fff")};
  border-bottom: 1px solid #efefef;
  border-radius: 0.4rem;
`;

const ListItemHeader = styled.div`
  font-size: ${props => (props.size ? props.size : 2)}rem;
  font-weight: 700;
  a {
    color: inherit;
  }
  a:hover,
  a:active,
  a:focus {
    color: #ff0066;
    text-decoration: none;
  }
`;

const ListItemBody = styled.div`
  font-size: inherit;
  font-weight: 400;
`;

export { List, ListItem, ListItemHeader, ListItemBody };
