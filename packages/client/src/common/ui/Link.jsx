import React from 'react'
import PropTypes from 'prop-types'
import { Link as ReactRouterLink } from 'react-router-dom'
import { Link as ChakraLink } from '@chakra-ui/react'

export const theme = {
    Link: {
        baseStyle: {
            color: 'primary.400',
        },
    },
}

export const Link = ChakraLink

/**
 * Adds some basic styling to react-router's links to make them consistent
 * @param  {*} props
 */
export function RouterLink({ to, ...props }) {
    return <Link as={ReactRouterLink} to={to} {...props} />
}

RouterLink.propTypes = {
    to: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object,
        PropTypes.func,
    ]).isRequired,
}
