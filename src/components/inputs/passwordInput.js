import TextInput from './textInput'

function PasswordInput({input, name, id, label, required}) {
  return (
    <TextInput
      input={input}
      id={id || "password"}
      required={required}
      type="password"
      label={label || "Password"}
      name={name || "password"}
    ></TextInput>
  )
}

export default PasswordInput;
