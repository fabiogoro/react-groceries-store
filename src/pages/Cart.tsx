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
import { useUserContext } from '../contexts/UserContext'
import { CartData } from '../hooks/CartHook'
import { ReactNode } from 'react'

function Cart() {
  const user = useUserContext()
  useAuth(user)

  return (
    <Container className="mt-4 avoid-footer text-center">
      <Card className="px-4">
        <Card.Body className="text-center">
          <Card.Title className="fw-bold mb-4 fs-2">My cart</Card.Title>
          <Row>
            <Col lg="6" xs="12" className="mb-4">
              <ListGroup>
                {!user?.cart?.isNotEmpty?(
                  <Card>
                    <Card.Body>
                      The items you add to your cart will appear here.
                    </Card.Body>
                  </Card>
                ):null}
                {user?.cart?.map((p: CartData): ReactNode => {
                  return (
                    <ListGroup.Item
                      key={p.id}
                      className="d-flex justify-content-between align-items-center"
                    >
                      <div>
                        <Image
                          className="card-img-top img-fluid"
                          src={p.thumbnail}
                          alt="..."
                          style={{ width: 100, height: 40 }}
                        />
                      </div>

                      <div className="fw-bold">{p.title}</div>

                      <div className="text-center my-4">
                        <Button
                          onClick={user?.cart?.removeCart(p.id)}
                          variant="outline-dark"
                          size="sm"
                          className="mx-2"
                        >
                          <FontAwesomeIcon icon={faMinus} />
                        </Button>{' '}
                        {p.quantity}{' '}
                        <Button
                          onClick={user?.cart?.addCart(p.id)}
                          variant="outline-dark"
                          size="sm"
                          className="mx-2"
                        >
                          <FontAwesomeIcon icon={faPlus} />
                        </Button>
                        <br />
                        <br />${(p.price * p.quantity).toFixed(2)}
                      </div>
                    </ListGroup.Item>
                  )
                })}
              </ListGroup>
            </Col>

            <Col lg={6} xs={12}>
              <Card>
                <Card.Body className="text-center">
                  <Card.Title className="fw-bold">Total</Card.Title>

                  <Card.Title className="mt-4">
                    {user?.cart?.totalItems} items
                  </Card.Title>

                  <Card.Title className="mb-4">
                    ${user?.cart?.totalPrice}
                  </Card.Title>
                  {user?.cart?.isNotEmpty ? (
                    <Button variant="dark" href="checkout">
                      Place order
                    </Button>
                  ) : null}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default Cart
