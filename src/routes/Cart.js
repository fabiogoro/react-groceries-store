import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'
import { useAuth } from '../hooks/AuthHook'

function Cart({ user }) {
  const cart = user.cart
  useAuth(user)

  return (
    <Container className="mt-4 avoid-footer">
      <Row>
        <Col lg="6" xs="12" className="mb-4">
          <ListGroup>
            {!cart.isNotEmpty?(
              <Card>
                <Card.Body>
                  The items you add to your cart will appear here.
                </Card.Body>
              </Card>
            ):null}
            {cart.data.cart?.map((p) => (
              <ListGroup.Item
                key={p.id}
                className="d-flex justify-content-between align-items-center"
              >
                <div>
                  <Image
                    className="card-img-top img-fluid"
                    src={p.thumbnail}
                    alt="..."
                    style={{ width: 120, height: 120 }}
                  />
                </div>

                <div className="fw-bold">{p.title}</div>

                <div>
                  <Button
                    onClick={cart.removeCart(p.id)}
                    variant="outline-dark"
                    size="sm"
                  >
                    <FontAwesomeIcon icon={faMinus} />
                  </Button>{' '}
                  {p.quantity}{' '}
                  <Button
                    onClick={cart.addCart(p.id)}
                    variant="outline-dark"
                    size="sm"
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </Button>
                  <br />
                  <br />${(p.price * p.quantity).toFixed(2)}
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>

        <Col lg={6} xs={12}>
          <Card>
            <Card.Body className="text-center">
              <Card.Title className="fw-bold">Total</Card.Title>

              <Card.Title className="mt-4">
                {cart.totalItems} items
              </Card.Title>

              <Card.Title className="mb-4">
                ${cart.totalPrice}
              </Card.Title>
              {cart.isNotEmpty?(
                <Button variant="dark" href="checkout">
                  Place order
                </Button>
              ):null}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Cart
