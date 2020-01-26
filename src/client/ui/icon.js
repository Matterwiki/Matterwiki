import React from 'react'
import feather from 'feather-icons'

const Icon = props => {
  const { type } = props
  let size
  if (!props.size) size = 24
  else size = props.size

  return (
    <span
      className='icon'
      style={{ cursor: props.cursorPointer ? 'pointer' : '' }}
      dangerouslySetInnerHTML={{
        __html: feather.icons[type].toSvg({ width: size, height: size })
      }}
    />
  )
}

export default Icon
