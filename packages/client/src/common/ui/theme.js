import { extendTheme, theme } from '@chakra-ui/react'

import { theme as headingTheme } from './Heading'
import { theme as buttonsTheme } from './Buttons'
import { theme as formInputTheme } from './form/FormInput'
import { theme as linkTheme } from './Link'

// TODO: Dark mode and light mode
// TODO: Support for multiple themes
const customTheme = extendTheme({
    colors: {
        text: '#4d4d4d',
        border: theme.colors.gray[200],
        primary: {
            50: '#ffe1f2',
            100: '#ffb1d3',
            200: '#ff7eb5',
            300: '#ff4c97',
            // 400 & 500 are the same intentionally.
            // Chakra uses the `500` color as the default
            // color in a swatch.
            // https://smart-swatch.netlify.app/#ff1a79
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

    components: {
        ...headingTheme,
        ...buttonsTheme,
        ...formInputTheme,
        ...linkTheme,
    },

    styles: {
        global: {
            body: {
                background: 'white',
                color: 'text',
                fontSize: 'md',
                lineHeight: '1.6',
                overflowX: 'hidden',
                margin: '0',
            },
        },
    },
})

// Quick shortcut to inspect the `theme` applied
if (process.env.NODE_ENV === 'development') {
    window.wikiTheme = customTheme
}

export default customTheme
