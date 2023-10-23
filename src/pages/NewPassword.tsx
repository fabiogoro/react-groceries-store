import Container from 'react-bootstrap/Container'
import Alert from 'react-bootstrap/Alert'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useSearchParams } from 'react-router-dom'
import PasswordInput from '../components/inputs/passwordInput'
import Input from '../util/form/input'
import { useForm } from '../hooks/FormHook'
import { useApiContext } from '../contexts/ApiContext'
import { postNewPassword } from '../api/UserApi'

function NewPassword() {
  const api = useApiContext()
  const [searchParams] = useSearchParams()
  const queryParam = searchParams.get('token')
  const [form] = useForm(postNewPassword.bind(api), {
    error: '',
    success: '',
    token: queryParam||'',
    password: new Input(),
    confirm: new Input(validatePasswords),
  })

  function validatePasswords() {
    if (form.data['password'].value !== form.data['confirm'].value) {
      return 'Passwords must match.'
    }
  }

  return (
    <Container className="mt-4 px-5 text-center">
      {form.data.success !== '' ? (
        <Alert variant="success">{form.data.success}</Alert>
      ) : null}
      {typeof(form.data.error)==='string' && form.data.error !== '' ? (
        <Alert variant="danger">{form.data.error}</Alert>
      ) : null}
      <Form onSubmit={form.formSubmit()}>
        <Card>
          <Card.Body>
            <Card.Title className="fw-bold mb-4 fs-2">Reset password</Card.Title>

            <PasswordInput
              changeHandler={form.changeHandler()}
              input={form.data['password']}
            ></PasswordInput>

            <PasswordInput
              changeHandler={form.changeHandler()}
              input={form.data['confirm']}
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
