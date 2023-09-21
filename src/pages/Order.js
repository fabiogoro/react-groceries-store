import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useLoaderData, useSearchParams } from 'react-router-dom'
import { useEffect } from "react"
import Alert from 'react-bootstrap/Alert'
import { useNavigate } from 'react-router-dom'
import ShortList from '../components/ShortList'
import { useFetch } from '../hooks/FetchHook'
import { fetchOrder } from '../api/OrderApi'
import { Cart } from '../hooks/CartHook'
import { useUserContext } from '../contexts/UserContext'

function Order() {
  const user = useUserContext()
  const navigate = useNavigate()
  const id = useLoaderData()
  const [searchParams, ] = useSearchParams()
  const message = searchParams.get('message') || ''
  const [order] = useFetch({f: fetchOrder, id})

  useEffect(() => {
    if (order && Object.keys(order).length<1) navigate('/')
  }, [order, navigate])

  return (
    <Container className="mt-4 avoid-footer">
      {message !== '' ? (
        <Alert variant="success">{message}</Alert>
      ) : null}
      <Row>
        <Col>
          {order?(
            <Card className="mb-4">
              <Card.Body className="mx-4">
                {user.isAdmin?(
                  <>
                    <Card.Title className="text-center fw-bold mb-4 fs-2">
                      Receipt from {order.user_info?.name} for {(new Date(order.order_date)).toLocaleString()}
                    </Card.Title>
                    <Card className="mb-4">
                      <Card.Body>
                        <Card.Title className="text-center fw-bold mb-4">
                          User info
                        </Card.Title>
                        <Card.Text className="text-center">
                          Address: {order?.address_info?.address} - {order?.address_info?.city}<br/>
                          Name: {order?.user_info?.name}<br/>
                          Email: {order?.user_info?.email}<br/>
                          Phone: {order?.user_info?.phone}<br/>
                        </Card.Text>

                      </Card.Body>
                    </Card>
                  </>
                ):(
                  <>
                    <Card.Title className="text-center fw-bold mb-4 fs-2">
                      Your receipt for {(new Date(order.order_date)).toLocaleString()}
                    </Card.Title>
                    <Card className="mb-4">
                      <Card.Body>
                        <Card.Title className="text-center fw-bold mb-4">
                          Delivery info
                        </Card.Title>
                        <Card.Text className="text-center">
                          {order?.address_info?.address} - {order?.address_info?.city}
                        </Card.Text>

                      </Card.Body>
                    </Card>
                  </>
                )}


                <Card className="mb-4">
                  <Card.Body>
                    <Card.Title className="text-center fw-bold mb-4">
                      Receipt
                    </Card.Title>
                    <Card.Text className="text-center">
                      Total items: {Cart.totalItems(order?.groceries)}<br/>
                      Total price: ${Cart.totalPrice(order?.groceries).toFixed(2)}
                    </Card.Text>
                    <ShortList items={order?.groceries}></ShortList>

                  </Card.Body>
                </Card>
              </Card.Body>
            </Card>
          ):null}
        </Col>
      </Row>
    </Container>
  );
}

export default Order;
