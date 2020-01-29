import React from 'react'
import {
  Box,
  Flex
} from 'theme-ui'

export const flexWrapperDecorator = (extraStyles = {}) => storyFn => {
  return (
    <Flex sx={{
      marginTop: 3,
      justifyContent: 'center',
      flexWrap: 'wrap',
      ...extraStyles
    }}
    >
      {storyFn()}
    </Flex>
  )
}

export const SpacedBox = ({ children }) => <Box sx={{ marginY: 2, width: '100%' }}>{children}</Box>
