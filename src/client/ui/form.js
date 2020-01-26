import styled from 'styled-components'

const Form = styled.form`
  margin-bottom: ${props => (props.marginBottom ? `${props.marginBottom}rem` : '')};
`

export default Form
