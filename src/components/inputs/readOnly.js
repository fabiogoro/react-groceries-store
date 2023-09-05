import Form from 'react-bootstrap/Form'
import FloatingLabel from 'react-bootstrap/FloatingLabel'

function ReadOnly({value, label}) {

  return (
    <FloatingLabel
      className="text-start"
      controlId={value||"text"}
      label={label||"text"}
    >
      <Form.Control
        placeholder={value||"text"}
        value={value||""}
        className="form-control-plaintext"
        readOnly
      />
    </FloatingLabel>
  );
}

export default ReadOnly;