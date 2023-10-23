import TextInput, { InputParams } from './textInput'

function NumberInput({changeHandler, input, name, id, label, required, className, defaultValue, step}:InputParams) {
  return (
    <TextInput
      defaultValue={defaultValue}
      input={input}
      id={id || 'number'}
      required={required}
      label={label || 'Number'}
      name={name || 'number'}
      type="number"
      step={step||1}
      changeHandler={changeHandler}
    ></TextInput>
  );
}

export default NumberInput;
