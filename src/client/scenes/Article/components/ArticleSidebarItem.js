import React from 'react'

import { Heading, SidebarBlock, Icon } from 'ui'

const ArticleSidebarItem = ({ title, children, iconType }) => (
  <SidebarBlock>
    <Heading size='1' transform='uppercase'>
      {iconType ? <Icon type={iconType} size='12' /> : null} {title}
    </Heading>
    {children}
  </SidebarBlock>
)

export default ArticleSidebarItem
