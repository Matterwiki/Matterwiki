// This is based on the hidden-styled component by Brent Jackson (@jxnblk)
// https://github.com/jxnblk/hidden-styled (Licensed under MIT)
// Thank you Brent!

import styled from 'styled-components'
import breakpoints from './breakpoints'

export const hidden = key => props =>
  props[key]
    ? {
      [breakpoints[key]]: {
        display: 'none'
      }
    }
    : null

export const small = hidden('small')
export const medium = hidden('medium')
export const large = hidden('large')

const Hide = styled.span([], small, medium, large, {
  display: 'inherit'
})

export default Hide
