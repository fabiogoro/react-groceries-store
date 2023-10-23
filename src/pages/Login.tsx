import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import EmailInput from '../components/inputs/emailInput'
import PasswordInput from '../components/inputs/passwordInput'
import { useForm } from '../hooks/FormHook'
import Input from '../util/form/input'
import Alert from 'react-bootstrap/Alert'
import { useApiContext } from '../contexts/ApiContext'
import { postLogin } from '../api/UserApi'

function Login() {
  const api = useApiContext()
  const [form] = useForm(postLogin.bind(api), {
    error: '',
    success: '',
    token: '',
    email: new Input(),
    password: new Input(),
  })

  return (
    <Container className="mt-4 px-5 text-center">
      {typeof(form.data.error)==='string' && form.data.error !== '' ? (
        <Alert variant="danger">{form.data.error}</Alert>
      ) : null}
      <Form noValidate onSubmit={form.formSubmit()}>
        <Card>
          <Card.Body>
            <Card.Title className="fw-bold mb-4 fs-2">Log in</Card.Title>

            <EmailInput
              changeHandler={form.changeHandler()}
              input={form.data['email']}
            ></EmailInput>

            <PasswordInput
              changeHandler={form.changeHandler()}
              input={form.data['password']}
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
