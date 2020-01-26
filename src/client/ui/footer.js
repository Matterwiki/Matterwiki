import styled from 'styled-components'

const Footer = styled.footer`
  display: flex;
  justify-content: ${props => (props.align ? props.align : 'left')};
  align-content: ${props => (props.align ? props.align : 'left')};
  align-items: center;
`

export default Footer
