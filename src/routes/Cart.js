import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import { useEffect } from "react"

function Cart({ user, cart, cartApi }) {
  const navigate = useNavigate()
  useEffect(() => {
    if(user && !user.name) navigate('/login')
  }, [user])


  return (
    <Container className="mt-4">
      <Row>
        <Col lg="6" xs="12" className="mb-4">
          <ListGroup>
            {cart.map((p) => (
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
                    onClick={cartApi.removeCart(p.id)}
                    variant="outline-dark"
                    size="sm"
                  >
                    <FontAwesomeIcon icon={faMinus} />
                  </Button>{' '}
                  {p.quantity}{' '}
                  <Button
                    onClick={cartApi.addCart(p.id, navigate)}
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
                {cart.length === 0
                  ? 0: cart.length===1?cart[0].quantity
                  : cart.reduce((c1, c2) =>
                    typeof c1 != 'number'
                      ? c1.quantity + c2.quantity
                      : c1 + c2.quantity
                  )}{' '}
                items
              </Card.Title>

              <Card.Title className="mb-4">
                $
                {cart.length === 0
                  ? 0: cart.length===1?cart[0].quantity*cart[0].price
                  : cart.reduce((c1, c2) =>
                    typeof c1 != 'number'
                      ? c1.quantity * c1.price + c2.quantity * c2.price
                      : c1 + c2.quantity * c2.price
                  )}{' '}
              </Card.Title>
              <Button variant="dark" href="checkout.html">
                Place order
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Cart
