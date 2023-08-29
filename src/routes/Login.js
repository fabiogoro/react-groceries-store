import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Button from 'react-bootstrap/Button'
import { useState } from 'react'
import { postLogin } from '../util/Api'
import { useNavigate } from 'react-router-dom'
import EmailInput from '../components/inputs/emailInput'
import PasswordInput from '../components/inputs/passwordInput'
import { fetchUser } from '../util/Api'
import Input from '../util/form/input'

function Login({ setUser }) {
  const [inputs, setInputs] = useState({
    email: new Input(),
    password: new Input(),
  })
  const navigate = useNavigate()

  async function formSubmit(e) {
    e.preventDefault()
    const data = new FormData(e.target)
    const res = await postLogin(Object.fromEntries(data))
    inputs.password.error = res.error
    if (res.error) {
      setInputs({
        ...inputs,
      })
    } else {
      const user = await fetchUser()
      setUser(user)
      navigate('/')
    }
  }

  function changeHandler({ target: { id, value, validationMessage } }) {
    inputs[id].value = value
    inputs[id].error = validationMessage
    setInputs({ ...inputs })
  }

  return (
    <Container className="mt-4 px-5 text-center">
      <Form onSubmit={formSubmit}>
        <Card>
          <Card.Body>
            <Card.Title className="fw-bold mb-4">Log in</Card.Title>

            <EmailInput
              changeHandler={changeHandler}
              input={inputs['email']}
            ></EmailInput>

            <PasswordInput
              changeHandler={changeHandler}
              input={inputs['password']}
            ></PasswordInput>

            <a href="/reset">Forgot your password?</a>
            <br />
            <a href="/signup">Not yet registered?</a>
            <br />

            <Button variant="dark" type="submit">
              Log in
            </Button>
          </Card.Body>
        </Card>
      </Form>
    </Container>
  )
}

export default Login
