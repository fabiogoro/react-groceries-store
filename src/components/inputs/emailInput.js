import Form from 'react-bootstrap/Form'
import FloatingLabel from 'react-bootstrap/FloatingLabel'

function EmailInput({changeHandler, input}) {

  return (
    <FloatingLabel
      className="mb-3 text-start"
      controlId="email"
      required
      label="Email"
    >
      <Form.Control
        name="email"
        placeholder=""
        type="email"
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

export default EmailInput;
