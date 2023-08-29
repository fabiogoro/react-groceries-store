import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Button from 'react-bootstrap/Button'
import { useState } from 'react'
import { postSignUp } from '../util/Api'
import { useNavigate } from 'react-router-dom'
import EmailInput from '../components/inputs/emailInput'
import PasswordInput from '../components/inputs/passwordInput'
import TextInput from '../components/inputs/textInput'
import { fetchUser } from '../util/Api'
import Input from '../util/form/input'

function Signup({ setUser }) {
  const [inputs, setInputs] = useState({
    email: new Input(),
    password: new Input(),
    confirm: new Input(validatePasswords),
    name: new Input(),
    phone: new Input(),
  })
  const navigate = useNavigate()

  async function formSubmit(e) {
    e.preventDefault()
    const data = new FormData(e.target)
    const res = await postSignUp(Object.fromEntries(data))
    if (res.error) {
    inputs.email.error = res.error
      setInputs({
        ...inputs,
      })
    } else {
      const user = await fetchUser()
      setUser(user)
      navigate('/')
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
      <Form onSubmit={formSubmit}>
        <Card>
          <Card.Body>
            <Card.Title className="fw-bold mb-4">Sign up</Card.Title>

            <EmailInput
              changeHandler={changeHandler}
              input={inputs['email']}
            ></EmailInput>

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

            <TextInput
              changeHandler={changeHandler}
              input={inputs['name']}
              name={'name'}
              id={'name'}
              label={'Name'}
            ></TextInput>

            <TextInput
              changeHandler={changeHandler}
              input={inputs['phone']}
              name={'phone'}
              id={'phone'}
              label={'Phone'}
            ></TextInput>

            <Button variant="dark" type="submit">
              Sign up
            </Button>
          </Card.Body>
        </Card>
      </Form>
    </Container>
  )
}

export default Signup
