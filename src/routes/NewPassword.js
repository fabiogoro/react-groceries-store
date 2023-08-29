import Container from 'react-bootstrap/Container'
import Alert from 'react-bootstrap/Alert'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Button from 'react-bootstrap/Button'
import { useState } from 'react'
import { postLogin } from '../util/Api'
import { useNavigate, useSearchParams } from 'react-router-dom'
import PasswordInput from '../components/inputs/passwordInput'
import { postNewPassword } from '../util/Api'
import Input from '../util/form/input'

function NewPassword({ setUser }) {
  const [success, setSuccess] = useState('')
  const [inputs, setInputs] = useState({
    password: new Input(),
    confirm: new Input(validatePasswords),
  })
  const [searchParams, setSearchParams] = useSearchParams()
  const queryParam = searchParams.get("token")
  const navigate = useNavigate()

  async function formSubmit(e) {
    e.preventDefault()
    const data = new FormData(e.target)
    const object = Object.fromEntries(data)
    object.token = queryParam
    const res = await postNewPassword(object)
    inputs.password.error = res.error
    if (res.error) {
      setInputs({
        ...inputs,
      })
    } else {
      setSuccess(res.success)    
    }
  }

  function validatePasswords() {
    if (inputs['password'].value != inputs['confirm'].value) {
      return 'Passwords must match.'
    }
  }

  function changeHandler({ target: { id, value, validationMessage } }) {
    inputs[id].value = value
    inputs[id].error = validationMessage
    if (inputs[id].validation) {
      inputs[id].error = inputs[id].validation()
    }
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

            <PasswordInput
              changeHandler={changeHandler}
              input={inputs['password']}
            ></PasswordInput>

            <PasswordInput
              changeHandler={changeHandler}
              input={inputs['confirm']}
              name={'confirm'}
              id={'confirm'}
              label={'Confirm password'}
            ></PasswordInput>

            <Button variant="dark" type="submit">
              Update Password
            </Button>
          </Card.Body>
        </Card>
      </Form>
    </Container>
  )
}

export default NewPassword
