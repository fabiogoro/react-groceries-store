import TextInput from './textInput'

function EmailInput({ changeHandler, input, name, id, label, required, maxlength }) {
  return (
    <TextInput
      changeHandler={changeHandler}
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
