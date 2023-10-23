import TextInput, { InputParams } from './textInput'

function EmailInput({changeHandler, input, name, id, label, required, maxlength }:InputParams) {
  return (
    <TextInput
      input={input}
      id={id || 'email'}
      required={required}
      label={label || 'Email'}
      name={name || 'email'}
      type="email"
      changeHandler={changeHandler}
      maxlength={maxlength || 30}></TextInput>
  )
}

export default EmailInput
