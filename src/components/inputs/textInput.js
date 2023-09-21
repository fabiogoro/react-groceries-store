import Form from 'react-bootstrap/Form'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import { useEffect } from 'react'

function TextInput({patternMessage, changeHandler, input, name, id, label, required, type, minlength, maxlength, pattern, className, defaultValue, step}) {
  useEffect(() => {
    if (defaultValue) input.value = defaultValue
  }, [defaultValue, input])

  return (
    <FloatingLabel
      className={className||"mb-3 text-start"}
      controlId={id||"text"}
      label={label||"text"}
    >
      <Form.Control
        name={name||"text"}
        placeholder={defaultValue||""}
        type={type||"text"}
        onChange={changeHandler}
        isInvalid={input.error}
        isValid={!input.error&&input.value}
        value={input.value}
        required={required||false}
        maxLength={maxlength||80}
        minLength={minlength||6}
        step={step||""}
        pattern={pattern||".*"}
      />
      <Form.Control.Feedback type="invalid">
        {input.error?(input.error.includes('format')?patternMessage:input.error):''}
      </Form.Control.Feedback>
    </FloatingLabel>
  );
}

export default TextInput;
