import Form from 'react-bootstrap/Form'
import FloatingLabel from 'react-bootstrap/FloatingLabel'

function TextInput({input, name, id, label, required, type, maxlength}) {

  return (
    <FloatingLabel
      className="mb-3 text-start"
      controlId={id||"text"}
      label={label||"text"}
    >
      <Form.Control
        name={name||"text"}
        placeholder=""
        type={type||"text"}
        isInvalid={input.error}
        isValid={!input.error&&input.value}
        required={required||false}
        maxLength={maxlength||80}
        {...input.register}
      />
      <Form.Control.Feedback type="invalid">
        {input.error}
      </Form.Control.Feedback>
    </FloatingLabel>
  );
}

export default TextInput;
