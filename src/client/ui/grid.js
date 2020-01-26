import styled from 'styled-components'
import breakpoints from './utils/breakpoints'

const Col = styled.div`
  display: block;
  /* IE 11 required specifying the flex-basis otherwise it breaks mobile */
  flex: 1 1 auto;
  margin-left: 0;
  max-width: 100%;
  margin-bottom: inherit;
  padding: 0 1rem;
  width: 100%;
  position: ${props => (props.fixed ? 'fixed' : '')};
  text-align: ${props => (props.textAlign ? props.textAlign : '')};
  flex: ${props => (props.width ? `0 0 ${props.width}%` : '')};
  max-width: ${props => (props.width ? `${props.width}%` : '')};
  margin-left: ${props => (props.offset ? `${props.offset}%` : '')};
  flex-grow: 0;
  ${breakpoints.css.small`
    max-width: ${props => (props.widthSmall ? `${props.widthSmall}%` : '')};
  `};
  ${breakpoints.css.medium`
    max-width: ${props => (props.widthMedium ? `${props.widthMedium}%` : '')};
  `};
  ${breakpoints.css.large`
    max-width: ${props => (props.widthLarge ? `${props.widthLarge}%` : '')};
  `};
`

const Row = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0;
  width: 100%;
  margin-left: -1rem;
  margin-top: ${props => (props.marginTop ? `${props.marginTop}rem` : '')};
  margin-bottom: ${props => (props.marginBottom ? `${props.marginBottom}rem` : '')};
  ${Col} {
    margin-bottom: 0.5rem;
  }
  ${breakpoints.css.medium`
    flex-direction: row;
  `};
`

export { Row, Col }
