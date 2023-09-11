import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import ReadOnly from '../components/inputs/readOnly'
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
import { postCheckout } from '../api/OrderApi'

function Checkout() {
  const api = useApiContext()
  const user = useUserContext()
  const navigate = useNavigate()
  useAuth(user)

  useEffect(() => {
    if (user.cart.isEmpty) navigate('/')
  }, [user.cart, navigate])

  const [form] = useForm(postCheckout.bind(api), {
    error: '',
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
      <Form onSubmit={form.formSubmit()} noValidate>
        <Card>
          <Card.Body>
            <Card.Title className="fw-bold mb-4">Order review</Card.Title>
            <Row>
              <Col lg="7">
                <Card>
                  <Card.Body>
                    <Card.Title className="fw-bold mb-4">My info</Card.Title>
                    <ReadOnly label="Name" value={user.data?.name}></ReadOnly>
                    <ReadOnly label="Email" value={user.data?.email}></ReadOnly>
                    <ReadOnly label="Phone" value={user.data?.phone}></ReadOnly>
                  </Card.Body>
                </Card>
                <Card className="mt-4">
                  <Card.Body>
                    <Card.Title className="fw-bold mb-4">
                      Delivery info
                    </Card.Title>
                    <AddressManager form={form}></AddressManager>
                  </Card.Body>
                </Card>
              </Col>
              <Col lg="5">
                <Card>
                  <Card.Body>
                    <Card.Title className="fw-bold mb-4">Order info</Card.Title>
                    <div className="mt-4">
                      Number of items: {user.cart.totalItems}
                    </div>

                    <div className="mb-4">
                      Total price: ${user.cart.totalPrice.toFixed(2)}
                    </div>
                    <ShortList items={user.cart}></ShortList>
                    <Button variant="dark" type="submit" className="mt-4">
                      Confirm order
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Form>
    </Container>
  )
}

export default Checkout
