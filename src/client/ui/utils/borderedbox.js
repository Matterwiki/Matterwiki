import styled from 'styled-components'

const BorderedBox = styled.div`
  border: 0.1rem solid ${props => (props.theme ? props.theme.border : '#d1d1d1')};
  padding: 2rem;
  border-radius: 0.4rem;
  box-shadow: ${props =>
    props.shadow ? `0rem 1rem 3rem ${props.theme ? props.theme.border : '#d1d1d1'}` : ''};
`

export default BorderedBox
