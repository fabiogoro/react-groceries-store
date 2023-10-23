import TextInput, { InputParams } from './textInput'

function PasswordInput({changeHandler, input, name, id, label, required}:InputParams) {
  return (
    <TextInput
      input={input}
      changeHandler={changeHandler}
      id={id || "password"}
      required={required}
      type="password"
      label={label || "Password"}
      name={name || "password"}
      pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{3,}"
      patternMessage="The password must contain at least one digit, and one lowercase and one uppercase letter."
    ></TextInput>
  )
}

export default PasswordInput;
