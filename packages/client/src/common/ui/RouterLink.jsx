import React from 'react'
import PropTypes from 'prop-types'
import { Link as ReactRouterLink } from 'react-router-dom'
import { Link as ChakraLink } from '@chakra-ui/core'

/**
 * Adds some basic styling to react-router's links to make them consistent
 * @param  {*} props
 */
export default function RouterLink({ to, ...props }) {
    return (
        <ChakraLink
            color="primary.400"
            as={ReactRouterLink}
            to={to}
            {...props}
        />
    )
}

RouterLink.propTypes = {
    to: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object,
        PropTypes.func,
    ]).isRequired,
}
