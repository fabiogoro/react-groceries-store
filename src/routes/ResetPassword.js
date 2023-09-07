import Container from 'react-bootstrap/Container'
import Alert from 'react-bootstrap/Alert'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import EmailInput from '../components/inputs/emailInput'
import Input from '../util/form/input'
import { useForm } from '../hooks/FormHook'
import Modal from 'react-bootstrap/Modal'
import Spinner from 'react-bootstrap/Spinner'
import { useApiContext } from '../contexts/ApiContext'

function ResetPassword({ setUser }) {
  const api = useApiContext()
  const [form] = useForm(api.postResetPassword.bind(api), {
    error: '',
    success: '',
    email: new Input(),
  })

  return (
    <Container className="mt-4 px-5 text-center">
      {form.data.success!==''?(
      <Alert variant="success">
        {form.data.success}
      </Alert>
      ):null}
      <Form onSubmit={form.formSubmit()}>
        <Card>
          <Card.Body>
            <Card.Title className="fw-bold mb-4">Reset password</Card.Title>

            <EmailInput
              changeHandler={form.changeHandler()}
              input={form.data['email']}
            ></EmailInput>

            <Button variant="dark" type="submit">
              Submit password reset request
            </Button>
          </Card.Body>
        </Card>
      </Form>
      <Modal
        show={form.data.isLoading}
        centered
        contentClassName="bg-transparent border-0"
        className="d-flex"
      >
        <Spinner className=""></Spinner>
      </Modal>
    </Container>
  )
}

export default ResetPassword
