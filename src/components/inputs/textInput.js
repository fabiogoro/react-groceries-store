import Form from 'react-bootstrap/Form'
import FloatingLabel from 'react-bootstrap/FloatingLabel'

function TextInput({changeHandler, input, name, id, label, required, type}) {

  return (
    <FloatingLabel
      className="mb-3 text-start"
      controlId={id||"text"}
      required={required||false}
      label={label||"text"}
    >
      <Form.Control
        name={name||"text"}
        placeholder=""
        type={type||"text"}
        onChange={changeHandler}
        value={input.value}
        isInvalid={input.error}
        isValid={!input.error&&input.value}
      />
      <Form.Control.Feedback type="invalid">
        {input.error}
      </Form.Control.Feedback>
    </FloatingLabel>
  );
}

export default TextInput;
