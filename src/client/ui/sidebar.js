import styled from "styled-components";

const Sidebar = styled.div`
  padding: 0.5rem;
  border-radius: 0.4rem;
`;

const SidebarBlock = styled.div`
  background-color: ${props => (props.theme ? props.theme.secondaryBackground : "#f6f6f6")};
  padding: 1rem 2rem;
  border-radius: 0.4rem;
  margin-bottom: 3rem;
  overflow-wrap: break-word;
`;

export { Sidebar, SidebarBlock };
