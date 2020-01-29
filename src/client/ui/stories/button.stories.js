import React from 'react'
import { FaHtml5, FaNodeJs, FaExclamation, FaGift, FaAddressCard, FaCss3 } from 'react-icons/fa'
import { flexWrapperDecorator } from './utils'
import Button from '../Button'

export default {
  title: 'Button',
  decorators: [flexWrapperDecorator()]
}

export const TextOnly = () => {
  return (
    <>
      <Button>Primary Button</Button>&nbsp;
      <Button kind='danger'>Danger Button</Button>&nbsp;
      <Button kind='muted'>Muted Button</Button>
    </>
  )
}

export const TextWithIcon = () => {
  return (
    <>
      <Button icon={FaHtml5}>HTML 5</Button>&nbsp;
      <Button icon={FaCss3} kind='danger'>CSS 3</Button>&nbsp;
      <Button icon={FaNodeJs} kind='muted'>Node.js</Button>
    </>
  )
}

export const IconOnly = () => {
  return (
    <>
      <Button icon={FaExclamation} iconSize={20} />&nbsp;
      <Button icon={FaGift} iconSize={20} kind='danger' />&nbsp;
      <Button icon={FaAddressCard} iconSize={20} kind='muted' />&nbsp;
    </>
  )
}

export const Disabled = () => {
  return (
    <>
      <Button disabled>Primary Button</Button>&nbsp;
      <Button kind='danger' disabled>Danger Button</Button>&nbsp;
      <Button kind='muted' disabled>Muted Button</Button>
    </>
  )
}
