import React, { useCallback, useState } from 'react'
import { action } from '@storybook/addon-actions'
import { FaMapPin, FaInbox } from 'react-icons/fa'
import { Box, Flex } from 'theme-ui'

import { flexWrapperDecorator, SpacedBox } from './utils'

import {
  Checkbox,
  FileUploadInput,
  FormGroup,
  Form,
  NumberInput,
  Radio,
  TextArea,
  TextInput,
  TextInputWithIcon,
  Select
} from '../Form'
import Button from '../Button'

export default {
  title: 'Forms',
  decorators: [
    storyFn => {
      return (
        <Form
          sx={{
            width: '500px',
            margin: 4
          }}
          onSubmit={e => {
            e.preventDefault()
            action('on-submit')(e)
          }}
        >
          <SpacedBox>{storyFn()}</SpacedBox>
          <Button>
            Submit
          </Button>
        </Form>
      )
    },
    flexWrapperDecorator()
  ]
}

export const Checkboxes = () => {
  return (
    <>
      <FormGroup
        title='Regular'
      >
        <Checkbox name='defaultStateRegular' labelText='Default state' onChange={action('onChange')} /> {}
        <Checkbox name='checkedStateRegular' checked labelText='Checked state' onChange={action('onChange')} />
      </FormGroup>

      <FormGroup title='Disabled'>
        <Checkbox name='defaultStateDisabled' disabled labelText='Default State' />
        <Checkbox name='checkedStateDisabled' checked disabled labelText='Checked State' />
      </FormGroup>

      <FormGroup
        title='Group'
      >
        <Checkbox name='groupCheck' labelText='😺' />
        <Checkbox name='groupCheck' labelText='🐶' checked />
        <Checkbox name='groupCheck' labelText='🦑' disabled />
        <Checkbox name='groupCheck' labelText='🐘' checked disabled />
      </FormGroup>
    </>
  )
}

export const Inputs = () => {
  return (
    <>
      <FormGroup
        title='Regular'
      >
        <SpacedBox>
          <TextInput
            name='regular1'
            onChange={action('on-regular1-change')}
            placeholder='Type something'
          />
        </SpacedBox>
        <SpacedBox>
          <TextInput
            name='regular2'
            labelText='With Label'
            onChange={action('on-regular2-change')}
            placeholder='Type something'
          />
        </SpacedBox>
        <SpacedBox>
          <TextInput
            name='regular2'
            labelText='With Default Value'
            onChange={action('on-regular3-change')}
            placeholder='Type something'
            value='Ghosts are real 👻'
          />
        </SpacedBox>
      </FormGroup>

      <FormGroup title='Disabled'>
        <SpacedBox>
          <TextInput
            disabled
            name='disabled1'
            onChange={action('on-disabled1-change')}
            placeholder='Type something'
          />
        </SpacedBox>
        <SpacedBox>
          <TextInput
            disabled
            name='disabled2'
            labelText='With Default Value'
            onChange={action('on-disabled2-change')}
            placeholder='Type something'
            value='Ghosts are real 👻'
          />
        </SpacedBox>
      </FormGroup>

      <FormGroup title='Validation'>
        <TextInput
          name='validation1'
          onChange={action('on-validation1-change')}
          placeholder='Type something'
          value='1234568 abc'
          validationErrorText='Spaces not allowed.'
        />
      </FormGroup>

      <FormGroup title='Types'>
        <SpacedBox>
          <TextInput
            labelText='Username'
            name='type1'
            onChange={action('on-type1-change')}
            placeholder='Enter Username'
          />
        </SpacedBox>
        <SpacedBox>
          <TextInput
            labelText='Password'
            name='type2'
            onChange={action('on-type2-change')}
            placeholder='Enter password'
            type='password'
          />
        </SpacedBox>
        <SpacedBox>
          <NumberInput
            labelText='Number'
            name='number1'
            onChange={action('on-number1-change')}
            placeholder='Enter number'
          />
        </SpacedBox>
      </FormGroup>
    </>
  )
}

export const InputWithIcon = () => {
  return (
    <>
      <SpacedBox>
        <TextInputWithIcon
          name='icon1'
          onChange={action('on-icon1-change')}
          placeholder='Enter location'
          icon={FaMapPin}
        />
      </SpacedBox>
      <SpacedBox>
        <TextInputWithIcon
          name='icon1'
          onChange={action('on-icon1-change')}
          placeholder='Enter email'
          icon={FaInbox}
        />
      </SpacedBox>
    </>
  )
}

export const LongFormInput = () => {
  return (
    <>
      <SpacedBox>
        <TextArea
          name='textarea-0'
          onChange={action('on-textarea-1-change')}
          labelText='Prefilled'
          placeholder='Once upon a time, in France...'
          value='My name is Casper. I am a ghost 👻'
        />
      </SpacedBox>
      <SpacedBox>
        <TextArea
          name='textarea-1'
          onChange={action('on-textarea-1-change')}
          labelText='Regular'
          placeholder='Once upon a time, in France...'
        />
      </SpacedBox>
      <SpacedBox>
        <TextArea
          name='textarea-2'
          onChange={action('on-textarea-2-change')}
          labelText='Validation Error'
          placeholder='Once upon a time, in France...'
          validationErrorText='Wishful thinking not permitted.'
        />
      </SpacedBox>
      <SpacedBox>
        <TextArea
          disabled
          name='textarea-3'
          labelText='Disabled'
          placeholder='Once upon a time, in France...'
        />
      </SpacedBox>
    </>
  )
}

export const RadioButtons = () => {
  return (
    <>
      <FormGroup title='Disabled'>
        <Radio name='defaultStateDisabled' disabled labelText='Default State' />
        <Radio name='checkedStateDisabled' checked disabled labelText='Checked State' />
      </FormGroup>

      <FormGroup
        title='Group'
      >
        <Radio name='groupCheck' labelText='😺' />
        <Radio name='groupCheck' labelText='🐶' checked />
        <Radio name='groupCheck' labelText='🦑' />
        <Radio name='groupCheck' labelText='🐘' />
      </FormGroup>
    </>
  )
}

export const Dropdowns = () => {
  return (
    <>
      <FormGroup title='Regular'>
        <SpacedBox>
          <Select
            name='selectRegular1'
            labelText='Regular, default value'
            onChange={action('on-selectRegular1-change')}
          >
            <option>English</option>
            <option>French</option>
            <option>Hindi</option>
            <option>Japanese</option>
          </Select>
        </SpacedBox>
        <SpacedBox>
          <Select
            name='selectRegular2'
            labelText='Regular, preselected value'
            value='hin'
            onChange={action('on-selectRegular2-change')}
          >
            <option value='en'>English</option>
            <option value='fr'>French</option>
            <option value='hin'>Hindi</option>
            <option value='jpn'>Japanese</option>
          </Select>
        </SpacedBox>
      </FormGroup>
      <FormGroup title='Disabled'>
        <SpacedBox>
          <Select
            disabled
            name='selectDisabled1'
            labelText='Disabled Select'
            onChange={action('on-selectDisabled1-change')}
          >
            <option>English</option>
            <option>French</option>
            <option>Hindi</option>
            <option>Japanese</option>
          </Select>
        </SpacedBox>
        <SpacedBox>
          <Select
            name='selectDisabled2'
            labelText='Disabled Options'
            onChange={action('on-selectDisabled2-change')}
          >
            <option disabled>English</option>
            <option>French</option>
            <option disabled>Hindi</option>
            <option>Japanese</option>
          </Select>
        </SpacedBox>
      </FormGroup>
      <FormGroup title='Validation'>
        <SpacedBox>
          <Select
            name='selectValidation1'
            onChange={action('on-selectValidation1-change')}
            validationErrorText='This option is invalid.'
          >
            <option>English</option>
            <option>French</option>
            <option>Hindi</option>
            <option>Japanese</option>
          </Select>
        </SpacedBox>
      </FormGroup>
    </>
  )
}

export const FileUpload = () => {
  const [files, setFiles] = useState([])
  const handleChange = useCallback((e) => {
    e.preventDefault()
    setFiles(
      Array.from(e.target.files).map(f => {
        return {
          src: URL.createObjectURL(f),
          name: f.name
        }
      })
    )
  }, [])

  return (
    <>
      <FileUploadInput onChange={handleChange} multiple />
      <Flex sx={{ marginY: 2 }}>
        {files ? files.map((f, i) => {
          return (
            <Box sx={{ marginX: 1 }} key={i}>
              <img sx={{ height: '64px' }} src={f.src} alt={f.name} />
            </Box>
          )
        }) : null}
      </Flex>
    </>
  )
}
