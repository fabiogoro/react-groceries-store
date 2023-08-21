import Form from 'react-bootstrap/Form'
import FloatingLabel from 'react-bootstrap/FloatingLabel'

function PasswordInput({changeHandler, input}) {

  return (
    <FloatingLabel
      className="mb-3 text-start"
      controlId="password"
      required
      label="Password"
    >
      <Form.Control
        name="password"
        placeholder=""
        type="password"
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

export default PasswordInput;
