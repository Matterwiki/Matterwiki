import React from 'react'
import PropTypes from 'prop-types'
import { ThemeProvider, CSSReset, theme, Box } from '@chakra-ui/core'
import _merge from 'lodash/merge'

import 'typeface-lato'

// TODO: Dark mode and light mode
// TODO: Support for multiple themes
const newTheme = _merge({}, theme, {
    colors: {
        text: '#4d4d4d',
        border: theme.colors.gray[200],
        primary: {
            50: '#ffe1f2',
            100: '#ffb1d3',
            200: '#ff7eb5',
            300: '#ff4c97',
            // TODO: 400 & 500 are the same intentionally.
            //       Chakra uses the `500` color as the default
            //       color in a swatch.
            //       I do not understand color swatches enough
            //       to pick the right palette :(
            400: '#ff1a79',
            500: '#ff1a79',
            600: '#b4004b',
            700: '#820035',
            800: '#500020',
            900: '#20000c',
        },
    },
    fonts: {
        body: `"Lato", "Helvetica Neue", "Helvetica", "Arial", sans-serif`,
        heading: 'inherit',
    },
})

// Quick shortcut to inspect the `theme` applied
if (process.env.NODE_ENV === 'development') window.wikiTheme = newTheme

/**
 * This component encapsulates styling that applies for the entire app.
 * Not to be confused with `Layout` component, which manages layout concerns in the app.
 */
export default function Global({ children }) {
    return (
        <ThemeProvider theme={newTheme}>
            <CSSReset />
            <Box
                background="white"
                color="text"
                fontSize="md"
                lineHeight="1.6"
                overflowX="hidden"
                margin="0">
                {children}
            </Box>
        </ThemeProvider>
    )
}

Global.propTypes = {
    children: PropTypes.node.isRequired,
}
