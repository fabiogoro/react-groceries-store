import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import EmailInput from '../components/inputs/emailInput'
import PasswordInput from '../components/inputs/passwordInput'
import TextInput from '../components/inputs/textInput'
import Input from '../util/form/input'
import { useForm } from '../hooks/FormHook'
import Alert from 'react-bootstrap/Alert'
import { useApiContext } from '../contexts/ApiContext'
import { postSignUp } from '../api/UserApi'

function Signup() {
  const api = useApiContext()
  const [form] = useForm(postSignUp.bind(api), {
    error: '',
    success: '', 
    token: '', 
    email: new Input(),
    password: new Input(),
    confirm: new Input(validatePasswords),
    name: new Input(),
    phone: new Input(),
  })

  function validatePasswords() {
    if (form.data['password'].value !== form.data['confirm'].value) {
      return 'Passwords must match.'
    }
  }

  return (
    <Container className="mt-4 px-5 text-center avoid-footer">
      {typeof(form.data.error)==='string' && form.data.error !== '' ? (
        <Alert variant="danger">{form.data.error}</Alert>
      ) : null}
      <Form onSubmit={form.formSubmit()} noValidate>
        <Card>
          <Card.Body>
            <Card.Title className="fw-bold mb-4 fs-2">Sign up</Card.Title>

            <EmailInput
              changeHandler={form.changeHandler()}
              input={form.data['email']}
              required={true}
            ></EmailInput>

            <PasswordInput
              changeHandler={form.changeHandler()}
              input={form.data['password']}
              required={true}
            ></PasswordInput>

            <PasswordInput
              changeHandler={form.changeHandler()}
              input={form.data['confirm']}
              name={'confirm'}
              id={'confirm'}
              label={'Confirm password'}
              required={true}
            ></PasswordInput>

            <TextInput
              changeHandler={form.changeHandler()}
              input={form.data['name']}
              name={'name'}
              id={'name'}
              label={'Name'}
              required={true}
            ></TextInput>

            <TextInput
              changeHandler={form.changeHandler()}
              input={form.data['phone']}
              name={'phone'}
              id={'phone'}
              label={'Phone'}
              maxlength={20}
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
