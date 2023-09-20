import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import ReadOnly from '../components/inputs/readOnly'
import TextInput from '../components/inputs/textInput'
import PasswordInput from '../components/inputs/passwordInput'
import Input from '../util/form/input'
import { useForm } from '../hooks/FormHook'
import Alert from 'react-bootstrap/Alert'
import Modal from 'react-bootstrap/Modal'
import Spinner from 'react-bootstrap/Spinner'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { useAuth } from '../hooks/AuthHook'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserContext } from '../contexts/UserContext'
import { useApiContext } from '../contexts/ApiContext'
import ShortList from '../components/ShortList'
import AddressManager from '../components/AddressManager'
import { postProfile } from '../api/UserApi'

function Profile() {
  const api = useApiContext()
  const user = useUserContext()
  const navigate = useNavigate()
  useAuth(user)

  useEffect(() => {
    if (user.cart.isEmpty) navigate('/')
  }, [user.cart, navigate])

  function validatePasswords() {
    if (
      form.data['new_password'].value !== form.data['confirm_password'].value
    ) {
      return 'Passwords must match.'
    }
  }

  function validateNewPassword() {
    if (
      form.data['new_password'].value.length == 0 &&
      form.data['old_password'].value.length != 0
    ) {
      return 'Please fill in your new password.'
    }
  }

  const [form] = useForm(postProfile.bind(api), {
    error: '',
    success: '',
    phone: new Input(),
    old_password: new Input(),
    new_password: new Input(validateNewPassword),
    confirm_password: new Input(validatePasswords),
    address: new Input(),
    address_id: new Input(),
    zip_code: new Input(),
    city: new Input(),
    state: new Input(),
    country: new Input(),
  })

  return (
    <Container className="mt-4 px-5 text-center avoid-footer">
      {form.data.error !== '' ? (
        <Alert variant="danger">{form.data.error}</Alert>
      ) : null}
      {form.data.success !== '' ? (
        <Alert variant="success">{form.data.success}</Alert>
      ) : null}
      <Form onSubmit={form.formSubmit()} noValidate>
        <Card className="px-5">
          <Card.Body>
            <Card.Title className="fw-bold mb-4">My profile</Card.Title>
            <Row>
              <Card>
                <Card.Body>
                  <Card.Title className="fw-bold mb-4">My info</Card.Title>
                  <ReadOnly id="name" label="Name" value={user.data?.name}></ReadOnly>
                  <ReadOnly label="Email" value={user.data?.email}></ReadOnly>
                  <TextInput
                    changeHandler={form.changeHandler()}
                    input={form.data['phone']}
                    id="phone"
                    name="phone"
                    defaultValue={user.data?.phone}
                    label="Phone"
                  ></TextInput>
                </Card.Body>
              </Card>
              <Card className="my-4">
                <Card.Body>
                  <Card.Title className="fw-bold mb-4">
                    Delivery address
                  </Card.Title>
                  <AddressManager form={form}></AddressManager>
                </Card.Body>
              </Card>
              <Card>
                <Card.Body>
                  <Card.Title className="fw-bold mb-4">
                    Update password
                  </Card.Title>
                  <PasswordInput
                    changeHandler={form.changeHandler()}
                    input={form.data['old_password']}
                    id="old_password"
                    name="old_password"
                    label="Old password"
                  ></PasswordInput>
                  <PasswordInput
                    changeHandler={form.changeHandler()}
                    input={form.data['new_password']}
                    id="new_password"
                    name="new_password"
                    label="New password"
                  ></PasswordInput>
                  <PasswordInput
                    changeHandler={form.changeHandler()}
                    input={form.data['confirm_password']}
                    id="confirm_password"
                    name="confirm_password"
                    label="Confirm password"
                  ></PasswordInput>
                  <Button variant="dark" type="submit" className="mt-4">
                    Save changes
                  </Button>
                </Card.Body>
              </Card>
            </Row>
          </Card.Body>
        </Card>
      </Form>
    </Container>
  )
}

export default Profile
