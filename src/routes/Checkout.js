import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { postCheckout } from '../util/Api'
import EmailInput from '../components/inputs/emailInput'
import PasswordInput from '../components/inputs/passwordInput'
import TextInput from '../components/inputs/textInput'
import ReadOnly from '../components/inputs/readOnly'
import Input from '../util/form/input'
import { useForm } from '../hooks/FormHook'
import Alert from 'react-bootstrap/Alert'
import Modal from 'react-bootstrap/Modal'
import Spinner from 'react-bootstrap/Spinner'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import ListGroup from 'react-bootstrap/ListGroup'
import { useAuth } from '../hooks/AuthHook'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Checkout({ user }) {
  const navigate = useNavigate()
  const [selected, setSelected] = useState(undefined)
  const cart = user.cart
  useAuth(user)

  useEffect(() => {
    console.log(cart.data.cart, user)
    if (cart.data.cart !== undefined && cart.data.cart.length < 1) navigate('/')
  }, [cart])

  const [form] = useForm(postCheckout, {
    error: '',
    address: new Input(),
    address_id: new Input(),
    zip_code: new Input(),
    city: new Input(),
    state: new Input(),
    country: new Input(),
  })

  useEffect(() => {
    setSelected(user.data?.addresses[0])
    form.data.address_id.value = user.data?.addresses[0]?.id
    form.setData({ ...form.data })
  }, [user.data])

  function onClick({ target: { id } }) {
    setSelected(user.data.addresses.filter((a) => a.id == id)[0])
    form.data.address_id.value = id
    form.setData({ ...form.data })
  }

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
                    <ListGroup className="mb-4">
                      {user.data?.addresses.map((a) => (
                        <ListGroup.Item
                          key={a.id}
                          variant={selected?.id == a.id ? 'dark' : ''}
                          className={`d-flex justify-content-between align-items-center ${
                            selected?.id == a.id ? 'active' : ''
                          }`}
                        >
                          <Col id={a.id} onClick={onClick}>
                            {a.address}, {a.city}, {a.country}
                          </Col>
                        </ListGroup.Item>
                      ))}
                      <ListGroup.Item
                        key={0}
                        variant={!selected ? 'dark' : ''}
                        className={`d-flex justify-content-between align-items-center ${
                          !selected ? 'active' : ''
                        }`}
                      >
                        <Col id={0} onClick={onClick}>
                          New address...
                        </Col>
                      </ListGroup.Item>
                    </ListGroup>
                    {selected ? (
                      <>
                        <TextInput
                          changeHandler={form.changeHandler()}
                          input={form.data['address_id']}
                          name={'address_id'}
                          id={'address_id'}
                          label={'Address'}
                          required={true}
                          className="visually-hidden"
                        ></TextInput>
                        <ReadOnly
                          label="Zip code"
                          value={selected.zip_code}
                        ></ReadOnly>
                        <ReadOnly
                          label="Address"
                          value={selected.address}
                        ></ReadOnly>
                        <ReadOnly label="City" value={selected.city}></ReadOnly>
                        <ReadOnly
                          label="State"
                          value={selected.state}
                        ></ReadOnly>
                        <ReadOnly
                          label="Country"
                          value={selected.country}
                        ></ReadOnly>
                      </>
                    ) : (
                      <>
                        <TextInput
                          changeHandler={form.changeHandler()}
                          input={form.data['zip_code']}
                          name={'zip_code'}
                          id={'zip_code'}
                          label={'Zip code'}
                          required={true}
                        ></TextInput>
                        <TextInput
                          changeHandler={form.changeHandler()}
                          input={form.data['address']}
                          name={'address'}
                          id={'address'}
                          label={'Address'}
                          required={true}
                        ></TextInput>
                        <TextInput
                          changeHandler={form.changeHandler()}
                          input={form.data['city']}
                          name={'city'}
                          id={'city'}
                          label={'City'}
                          required={true}
                        ></TextInput>
                        <TextInput
                          changeHandler={form.changeHandler()}
                          input={form.data['state']}
                          name={'state'}
                          id={'state'}
                          label={'State'}
                          required={true}
                        ></TextInput>
                        <TextInput
                          changeHandler={form.changeHandler()}
                          input={form.data['country']}
                          name={'country'}
                          id={'country'}
                          label={'Country'}
                          required={true}
                        ></TextInput>
                      </>
                    )}
                  </Card.Body>
                </Card>
              </Col>
              <Col lg="5">
                <Card>
                  <Card.Body>
                    <Card.Title className="fw-bold mb-4">Order info</Card.Title>
                    <div className="mt-4">
                      Number of items: {cart.totalItems}
                    </div>

                    <div className="mb-4">
                      Total price: ${cart.totalPrice.toFixed(2)}
                    </div>
                    <ListGroup variant="flush">
                      <ListGroup.Item
                        key="header"
                        className="d-flex justify-content-between align-items-center"
                      >
                        <Col className="fw-bold">Product</Col>
                        <Col className="fw-bold">Price</Col>

                        <Col className="fw-bold">Quantity</Col>
                      </ListGroup.Item>
                      {cart.data.cart?.map((p) => (
                        <ListGroup.Item
                          key={p.id}
                          className="d-flex justify-content-between align-items-center"
                        >
                          <Col>{p.title}</Col>
                          <Col>${(p.price * p.quantity).toFixed(2)}</Col>

                          <Col>{p.quantity}</Col>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
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

export default Checkout
