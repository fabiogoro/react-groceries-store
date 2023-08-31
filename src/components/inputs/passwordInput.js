import TextInput from './textInput'

function PasswordInput({changeHandler, input, name, id, label, required}) {
  return (
    <TextInput
      changeHandler={changeHandler}
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
