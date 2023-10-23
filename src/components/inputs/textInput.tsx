import Form from 'react-bootstrap/Form'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import { ChangeEvent, useEffect } from 'react'
import Input from '../../util/form/input'

export interface InputParams {
  patternMessage?:string, 
  changeHandler:({ target }:ChangeEvent)=>void, 
  input:Input, 
  name?:string, 
  id?:string, 
  label?:string, 
  required?:boolean, 
  type?:string, 
  minlength?:number, 
  maxlength?:number, 
  pattern?:string, 
  className?:string, 
  defaultValue?:string, 
  step?:number
  
}

function TextInput({
  patternMessage="", 
  changeHandler, 
  input, 
  name="text", 
  id="text", 
  label="text", 
  required=false, 
  type="text", 
  minlength=6, 
  maxlength=80, 
  pattern=".*", 
  className="mb-3 text-start", 
  defaultValue="", 
  step=1
}:InputParams) {
  useEffect(() => {
    if (defaultValue) input.value = defaultValue
  }, [defaultValue, input])

  return (
    <FloatingLabel
      className={className}
      controlId={id}
      label={label}
    >
      <Form.Control
        name={name}
        placeholder={defaultValue}
        type={type}
        onChange={changeHandler}
        isInvalid={!!input.error}
        isValid={!!(!input.error&&input.value)}
        value={input.value}
        required={required}
        maxLength={maxlength}
        minLength={minlength}
        step={step}
        pattern={pattern}
      />
      <Form.Control.Feedback type="invalid">
        {input.error?(input.error.includes('format')?patternMessage:input.error):''}
      </Form.Control.Feedback>
    </FloatingLabel>
  );
}

export default TextInput;
