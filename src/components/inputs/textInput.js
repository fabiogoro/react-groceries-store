import Form from 'react-bootstrap/Form'
import FloatingLabel from 'react-bootstrap/FloatingLabel'

function TextInput({patternMessage, changeHandler, input, name, id, label, required, type, minlength, maxlength, pattern, className}) {

  return (
    <FloatingLabel
      className={className||"mb-3 text-start"}
      controlId={id||"text"}
      label={label||"text"}
    >
      <Form.Control
        name={name||"text"}
        placeholder=""
        type={type||"text"}
        onChange={changeHandler}
        isInvalid={input.error}
        isValid={!input.error&&input.value}
        value={input.value}
        required={required||false}
        maxLength={maxlength||80}
        minLength={minlength||6}
        pattern={pattern||".*"}
        {...input.register}
      />
      <Form.Control.Feedback type="invalid">
        {input.error?(input.error.includes('format')?patternMessage:input.error):''}
      </Form.Control.Feedback>
    </FloatingLabel>
  );
}

export default TextInput;
