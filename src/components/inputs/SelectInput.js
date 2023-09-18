import Form from 'react-bootstrap/Form'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import { useEffect } from 'react'

function SelectInput({input, changeHandler, data, optionFunction, id, label, name, required, className, placeholder, defaultValue}) {
  useEffect(() => {
    if (defaultValue) input.value = defaultValue
  }, [defaultValue])

  return (
    <FloatingLabel
      className={className||"mb-3 text-start"}
      controlId={id||"select"}
      label={label||"Select"}
    >
      <Form.Select
        name={name||"select"}
        required={required||false}
        isInvalid={input.error}
        isValid={!input.error&&input.value}
        onChange={changeHandler}
        value={input.value}
      >
        <option value="">{placeholder || "Select one option"}</option>
        {data?.map(optionFunction)}
      </Form.Select>
      <Form.Control.Feedback type="invalid">
        {input.error}
      </Form.Control.Feedback>
    </FloatingLabel>
  );
}

export default SelectInput;
