import styled from 'styled-components'

const Divider = styled.hr`
  border: 0;
  border-top: 0.1rem solid ${props => (props.theme ? props.theme.border : '#d1d1d1')};
  margin: 3rem 0;
`

export default Divider
