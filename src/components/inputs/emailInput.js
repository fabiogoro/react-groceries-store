import Form from 'react-bootstrap/Form'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import TextInput from './textInput'

function EmailInput({ changeHandler, input, name, id, label, required }) {
  return (
    <TextInput
      changeHandler={changeHandler}
      input={input}
      id={id || 'email'}
      required={required}
      label={label || 'Email'}
      name={name || 'email'}
    ></TextInput>
  )
}

export default EmailInput
