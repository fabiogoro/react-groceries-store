import TextInput from './textInput'

function EmailInput({ input, name, id, label, required, maxlength }) {
  return (
    <TextInput
      input={input}
      id={id || 'email'}
      required={required}
      label={label || 'Email'}
      name={name || 'email'}
      type="email"
      maxlength={maxlength||30}
    ></TextInput>
  )
}

export default EmailInput
