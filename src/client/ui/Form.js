import React from 'react'
import {
  Box,
  Checkbox as TCheckbox,
  Flex,
  Input as TInput,
  Label,
  Radio as TRadio,
  Select as TSelect,
  Text,
  Textarea as TTextArea,
  useThemeUI
} from 'theme-ui'
import PropTypes from 'prop-types'
import { lighten } from 'polished'

const inputProps = {
  defaults: {
    disabled: false,
    labelText: '',
    sx: {},
    validationErrorText: '',
    value: ''
  },
  types: {
    disabled: PropTypes.bool,
    name: PropTypes.string.isRequired,
    labelText: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string.isRequired,
    validationErrorText: PropTypes.string,
    value: PropTypes.string
  }
}

const selectionProps = {
  defaults: {
    disabled: false,
    checked: false,
    onChange: () => { }
  },
  types: {
    disabled: PropTypes.bool,
    checked: PropTypes.bool,
    labelText: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func
  }
}

const getTextStyles = (disabled, isValid, primaryColor) => ({
  borderColor: disabled ? 'disabled' : (isValid ? 'text' : 'danger'),
  color: disabled ? 'disabled' : 'text',
  ':focus': {
    border: `1px solid ${primaryColor}`
  },
  ':invalid': {
    borderColor: 'danger',
    boxShadow: 'none'
  }
})

const getSelectionStyles = (disabled) => ({
  'input:disabled ~ &': {
    color: disabled ? 'disabled' : 'primary'
  }
})

const TextValidationError = ({ text }) => (
  <Text
    sx={{
      fontSize: 1,
      marginTop: 1,
      color: 'danger'
    }}
  >
    {text}
  </Text>
)

const Checkbox = ({ disabled, checked, labelText, name, onChange }) => {
  return (
    <Box>
      <Label sx={{
        color: disabled ? 'disabled' : 'text',
        userSelect: 'none'
      }}
      >
        <TCheckbox
          name={name}
          sx={getSelectionStyles(disabled)}
          disabled={disabled}
          onChange={onChange}
          defaultChecked={checked}
        />
        <span sx={{ marginTop: '0.1em' }}>{labelText}</span>
      </Label>
    </Box>
  )
}

Checkbox.defaultProps = selectionProps.defaults
Checkbox.propTypes = selectionProps.types

const FileUploadInput = ({
  accept,
  multiple,
  onChange: handleChange,
  message
}) => {
  return (
    <Box sx={{
      maxWidth: '500px',
      width: '100%',
      position: 'relative'
    }}
    >
      <TInput
        type='file'
        sx={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          cursor: 'pointer',
          opacity: 0,
          '&:hover + label, & + label:hover': {
            color: 'primary',
            borderColor: 'primary'
          }
        }}
        accept={accept}
        onChange={handleChange}
        multiple={multiple}
      />
      <Label sx={{
        width: '100%',
        padding: 4,
        borderStyle: 'dashed',
        borderWidth: '2px',
        borderColor: 'accent',
        textAlign: 'center',
        color: 'accent'
      }}
      >
        {message}
      </Label>
    </Box>
  )
}

FileUploadInput.defaultProps = {
  accept: '',
  multiple: false,
  message: 'Choose a file to upload',
  onChange: () => { }
}

FileUploadInput.propTypes = {
  accept: PropTypes.string,
  multiple: PropTypes.bool,
  message: PropTypes.string,
  onChange: PropTypes.func.isRequired
}

const FormGroup = ({ children, title, sx }) => {
  const { theme } = useThemeUI()
  const color = theme.colors.text

  return (
    <fieldset sx={{
      border: 0,
      paddingLeft: 0,
      marginBottom: 3,
      ...sx
    }}
    >
      {title && (
        <legend sx={{
          textTransform: 'uppercase',
          fontSize: 2,
          color: lighten(0.5, color)
        }}
        >{title}
        </legend>
      )}

      {children}
    </fieldset>
  )
}

FormGroup.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
  sx: PropTypes.object
}

const Form = ({ children, onSubmit: handleSubmit, sx }) => {
  // TODO: Make this powerul, use Formik and set this up so it's easier to deal with
  return (
    <form
      onSubmit={handleSubmit}
      sx={sx}
    >
      {children}
    </form>
  )
}

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  sx: PropTypes.object
}

const NumberInput = ({
  minValue,
  maxValue,
  step,
  sx,
  ...textInputProps
}) => {
  return (
    <TextInput
      type='number'
      maxValue={maxValue}
      minValue={minValue}
      step={step}
      {...textInputProps}
    />
  )
}

NumberInput.defaultProps = inputProps.defaults

NumberInput.propTypes = {
  ...inputProps.types,
  maxValue: PropTypes.number,
  minValue: PropTypes.number,
  step: PropTypes.number,
  sx: PropTypes.object
}

const Radio = ({ disabled, checked, labelText, name, onChange }) => {
  return (
    <Box>
      <Label sx={{
        color: disabled ? 'disabled' : 'text',
        userSelect: 'none'
      }}
      >
        <TRadio
          name={name}
          sx={getSelectionStyles(disabled)}
          disabled={disabled}
          onChange={onChange}
          defaultChecked={checked}
        />
        <span sx={{ marginTop: '0.1em' }}>{labelText}</span>
      </Label>
    </Box>
  )
}
Radio.defaultProps = selectionProps.defaults
Radio.propTypes = selectionProps.types

const Select = ({
  labelText,
  disabled,
  value,
  name,
  validationErrorText,
  onChange: handleChange,
  children
}) => {
  const { theme } = useThemeUI()
  const { primary } = theme.colors
  const isValid = !validationErrorText

  return (
    <Box sx={{ width: '100%' }}>
      {labelText && (
        <Label
          htmlFor={name}
          sx={{
            fontSize: 1,
            fontWeight: 'bold'
          }}
        >
          {labelText}
        </Label>
      )}
      <TSelect
        disabled={disabled}
        defaultValue={value}
        onChange={handleChange}
        sx={{
          ...getTextStyles(disabled, isValid, primary),
          ':-moz-focusring': {
            color: 'transparent',
            textShadow: '0 0 0 #000'
          }
        }}
      >
        {children}
      </TSelect>
      {!isValid && <TextValidationError text={validationErrorText} />}
    </Box>
  )
}

Select.defaultProps = {
  disabled: false,
  value: null,
  validationErrorText: '',
  onChange: () => { }
}
Select.propTypes = {
  labelText: PropTypes.string,
  disabled: PropTypes.bool,
  value: PropTypes.string,
  name: PropTypes.string.isRequired,
  validationErrorText: PropTypes.string,
  onChange: PropTypes.func,
  children: PropTypes.node.isRequired
}

const TextArea = ({
  disabled,
  labelText,
  name,
  onChange: handleChange,
  placeholder,
  rows,
  sx,
  validationErrorText,
  value
}) => {
  const { theme } = useThemeUI()
  const { primary } = theme.colors

  const isValid = !validationErrorText

  return (
    <Box sx={{ width: '100%' }}>
      {labelText && (
        <Label
          htmlFor={name}
          sx={{
            fontSize: 1,
            fontWeight: 'bold'
          }}
        >
          {labelText}
        </Label>
      )}
      <TTextArea
        disabled={disabled}
        name={name}
        rows={rows}
        sx={{
          ...getTextStyles(disabled, isValid, primary),
          ...sx
        }}
        placeholder={placeholder}
        onChange={handleChange}
        value={value}
      />
      {!isValid && <TextValidationError text={validationErrorText} />}
    </Box>
  )
}

TextArea.defaultProps = {
  disabled: false,
  rows: 6,
  validationErrorText: ''
}

TextArea.propTypes = {
  disabled: PropTypes.bool,
  name: PropTypes.string.isRequired,
  labelText: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string.isRequired,
  rows: PropTypes.number,
  sx: PropTypes.object,
  validationErrorText: PropTypes.string,
  value: PropTypes.string
}

const TextInput = ({
  disabled,
  name,
  labelText,
  onChange: handleChange,
  placeholder,
  sx,
  type,
  validationErrorText,
  value,
  ...extraInputProps
}) => {
  const { theme } = useThemeUI()
  const { primary } = theme.colors

  const isValid = !validationErrorText

  return (
    <Box sx={{ width: '100%' }}>
      {labelText && (
        <Label
          htmlFor={name}
          sx={{
            fontSize: 1,
            fontWeight: 'bold'
          }}
        >
          {labelText}
        </Label>
      )}
      <TInput
        disabled={disabled}
        defaultValue={value}
        name={name}
        onChange={handleChange}
        placeholder={placeholder}
        sx={{
          ...getTextStyles(disabled, isValid, primary),
          ...sx
        }}
        type={type}
        {...extraInputProps}
      />
      {!isValid && <TextValidationError text={validationErrorText} />}
    </Box>
  )
}

TextInput.defaultProps = {
  ...inputProps.defaults,
  type: 'text'
}

TextInput.propTypes = {
  ...inputProps.types,
  type: PropTypes.string
}

const TextInputWithIcon = ({ icon: Icon, sx, ...otherTextInputProps }) => {
  return (
    <Flex sx={{
      position: 'relative'
    }}
    >
      <TextInput
        type='text'
        {...otherTextInputProps}
        sx={{
          textIndent: 20,
          ...sx
        }}
      />
      <Icon
        className='icon-focus'
        sx={{
          position: 'absolute',
          top: '12px',
          left: '7px'
        }}
        size={16}
      />

    </Flex>
  )
}

TextInputWithIcon.defaultProps = inputProps.defaults

TextInputWithIcon.propTypes = {
  ...inputProps.types,
  icon: PropTypes.elementType
}

export {
  Checkbox,
  FileUploadInput,
  FormGroup,
  Form,
  NumberInput,
  Radio,
  Select,
  TextArea,
  TextInput,
  TextInputWithIcon
}
