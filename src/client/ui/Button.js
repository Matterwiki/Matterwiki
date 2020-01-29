import React from 'react'
import { Button as TButton, useThemeUI } from 'theme-ui'
import PropTypes from 'prop-types'
import { lighten } from 'polished'

const Button = ({ children, disabled, icon: Icon, iconSize, kind, sx }) => {
  const { theme } = useThemeUI()
  const color = theme.colors[kind]

  const btnStyles = Object.assign(
    {},
    disabled
      ? { backgroundColor: lighten(0.3, color) }
      : {
        ':hover': {
          cursor: 'pointer',
          backgroundColor: lighten(0.1, color)
        }
      }
  )

  return (
    <TButton
      variant={kind}
      sx={{
        ...btnStyles,
        ...sx
      }}

      disabled={disabled}
    >
      {Icon &&
      (
        <Icon sx={{ verticalAlign: 'middle', marginX: 2 }} size={iconSize} />
      )}
      <span sx={{ verticalAlign: 'middle' }}>{children}</span>
    </TButton>
  )
}

Button.defaultProps = {
  disabled: false,
  iconSize: 16,
  kind: 'primary'
}

Button.propTypes = {
  children: PropTypes.node,
  disabled: PropTypes.bool,
  icon: PropTypes.elementType,
  iconSize: PropTypes.number,
  kind: PropTypes.oneOf(['primary', 'secondary', 'danger', 'muted']),
  sx: PropTypes.object
}

export default Button
