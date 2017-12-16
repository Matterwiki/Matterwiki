import styled from "styled-components";

const List = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const ListItem = styled.div`
  width: 100%;
  cursor: pointer;
  padding: 1rem;
  background-color: ${props => (props.active ? "#efefef" : "#fff")};
  border-bottom: 1px solid #efefef;
  border-radius: 0.4rem;
`;

const ListItemHeader = styled.div`
  font-size: 2rem;
  font-weight: 700;
`;

const ListItemBody = styled.div`
  font-size: inherit;
  font-weight: 400;
`;

export { List, ListItem, ListItemHeader, ListItemBody };
