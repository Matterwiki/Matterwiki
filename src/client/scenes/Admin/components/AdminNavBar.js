import React from 'react'
import { List, ListItem, ListItemHeader, ListItemBody, Icon } from 'ui'
import { Hide } from 'ui/utils'

const AdminNavBar = ({ activeTab, handleSelect }) => (
  <List>
    <ListItem onClick={e => handleSelect('users', e)} active={activeTab === 'users'} cursorPointer>
      <ListItemHeader>
        <Icon type='users' />
        <Hide small>Users</Hide>
      </ListItemHeader>
      <Hide small>
        <ListItemBody>Create, edit, and delete users</ListItemBody>
      </Hide>
    </ListItem>
    <ListItem
      onClick={e => handleSelect('topics', e)}
      active={activeTab === 'topics'}
      cursorPointer
    >
      <ListItemHeader>
        <Icon type='folder' />
        <Hide small>Topics</Hide>
      </ListItemHeader>
      <Hide small>
        <ListItemBody>Create, edit, and delete topics</ListItemBody>
      </Hide>
    </ListItem>
    <ListItem
      onClick={e => handleSelect('customize', e)}
      active={activeTab === 'customize'}
      cursorPointer
    >
      <ListItemHeader>
        <Icon type='settings' />
        <Hide small>Customize</Hide>
      </ListItemHeader>
      <Hide small>
        <ListItemBody>Change the color scheme, and logo</ListItemBody>
      </Hide>
    </ListItem>
  </List>
)

export default AdminNavBar
