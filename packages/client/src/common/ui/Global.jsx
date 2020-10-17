import React from 'react'
import PropTypes from 'prop-types'
import { ChakraProvider } from '@chakra-ui/core'

import 'typeface-lato'

import customTheme from './theme'

/**
 * This component encapsulates styling that applies for the entire app.
 * Not to be confused with `Layout` component, which manages layout concerns in the app.
 */
export default function Global({ children }) {
    return <ChakraProvider theme={customTheme}>{children}</ChakraProvider>
}

Global.propTypes = {
    children: PropTypes.node.isRequired,
}
