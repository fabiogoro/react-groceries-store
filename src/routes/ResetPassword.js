import Container from 'react-bootstrap/Container'
import Alert from 'react-bootstrap/Alert'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Button from 'react-bootstrap/Button'
import { useState } from 'react'
import { postLogin } from '../util/Api'
import { useNavigate } from 'react-router-dom'
import EmailInput from '../components/inputs/emailInput'
import { postResetPassword } from '../util/Api'
import Input from '../util/form/input'

function ResetPassword({ setUser }) {
  const [success, setSuccess] = useState('')
  const [inputs, setInputs] = useState({
    email: new Input(),
  })
  const navigate = useNavigate()

  async function formSubmit(e) {
    e.preventDefault()
    const data = new FormData(e.target)
    const res = await postResetPassword(Object.fromEntries(data))
    inputs.email.error = res.error
    if (res.error) {
      setInputs({
        ...inputs,
      })
    } else {
      setSuccess(res.success)    
    }
  }

  function changeHandler({ target: { id, value, validationMessage } }) {
    inputs[id].value = value
    inputs[id].error = validationMessage
    setInputs({ ...inputs })
  }

  return (
    <Container className="mt-4 px-5 text-center">
      {success!=''?(
      <Alert variant="success">
        {success}
      </Alert>
      ):null}
      <Form onSubmit={formSubmit}>
        <Card>
          <Card.Body>
            <Card.Title className="fw-bold mb-4">Reset password</Card.Title>

            <EmailInput
              changeHandler={changeHandler}
              input={inputs['email']}
            ></EmailInput>

            <Button variant="dark" type="submit">
              Submit password reset request
            </Button>
          </Card.Body>
        </Card>
      </Form>
    </Container>
  )
}

export default ResetPassword
