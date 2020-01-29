
import React from 'react'
import { Spinner as TSpinner, Box, Text } from 'theme-ui'
import PropTypes from 'prop-types'

const Spinner = ({ message }) => {
  return (
    <Box>
      <TSpinner sx={{ verticalAlign: 'middle' }} />
      {message && (
        <Text sx={{
          verticalAlign: 'middle',
          display: 'inline-block',
          maxWidth: 200,
          paddingLeft: 2
        }}
        >
          {message}
        </Text>
      )}
    </Box>
  )
}

Spinner.propTypes = {
  message: PropTypes.string
}

export default Spinner
