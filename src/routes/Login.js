import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { postLogin } from '../util/Api'
import EmailInput from '../components/inputs/emailInput'
import PasswordInput from '../components/inputs/passwordInput'
import { useForm } from '../hooks/FormHook'
import Input from '../util/form/input'
import Alert from 'react-bootstrap/Alert'

function Login({ user }) {
  const [form] = useForm(postLogin, {
    error: '',
    email: new Input(),
    password: new Input(),
  })

  return (
    <Container className="mt-4 px-5 text-center">
      {form.data.error !== '' ? (
        <Alert variant="danger">{form.data.error}</Alert>
      ) : null}
      <Form onSubmit={form.formSubmit()}>
        <Card>
          <Card.Body>
            <Card.Title className="fw-bold mb-4">Log in</Card.Title>

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
