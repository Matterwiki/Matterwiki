import React from 'react'

import { Form, Input, Button, Icon } from 'ui'
import { BorderedBox } from 'ui/utils'

class ItemForm extends React.Component {
  componentWillMount () {
    this.initState(this.props)
  }

  componentWillReceiveProps (nextProps) {
    this.initState(nextProps)
  }

  handleChange = e => {
    const { name, value } = e.target

    this.setState({
      [name]: value
    })
  };

  handleSubmit = e => {
    e.preventDefault()

    const { handleSubmit, itemFormFields } = this.props

    handleSubmit(this.state)
    this.initState({
      itemFormFields
    })
  };

  initState = ({ itemFormFields, item }) => {
    const newState = itemFormFields.reduce((acc, formField) => {
      acc[formField.name] = item ? item[formField.name] : ''
      return acc
    }, {})
    this.setState(newState)
  };

  handleUpdateCancel = e => {
    e.preventDefault()
    this.props.onCancelUpdate()
  };

  render () {
    const { item, itemName, itemFormFields } = this.props
    const currentlyEditing = item && (
      <p className='editing-heading'>You are currently editing a {itemName}</p>
    )

    return (
      <BorderedBox shadow={item !== null}>
        {currentlyEditing}
        <Form onSubmit={this.handleSubmit} marginBottom='0'>
          {itemFormFields.map(formField => (
            <Input
              type={formField.type}
              placeholder={formField.name}
              name={formField.name}
              value={this.state[formField.name]}
              onChange={this.handleChange}
              key={formField.name}
            />
          ))}
          <Button type='submit' block>
            <Icon type={item ? 'send' : 'plus-square'} size='12' />{' '}
            {item ? `Update ${itemName}` : `Add ${itemName}`}
          </Button>
          {item ? (
            <Button block onClick={this.handleUpdateCancel} outline>
              <Icon type='x-square' size='12' /> Cancel
            </Button>
          ) : (
            ''
          )}
        </Form>
      </BorderedBox>
    )
  }
}

export default ItemForm
