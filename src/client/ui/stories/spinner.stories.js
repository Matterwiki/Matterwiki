import React from 'react'
import { flexWrapperDecorator } from './utils'
import Spinner from '../Spinner'

export default {
  title: 'Spinner',
  component: Spinner,
  decorators: [flexWrapperDecorator()]
}

export const NoText = () => <Spinner />

export const WithText = () => <Spinner message='Please wait, loading...' />
