import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useLoaderData } from 'react-router-dom'
import { useEffect } from "react"
import { useSearchParams } from 'react-router-dom'
import Alert from 'react-bootstrap/Alert'
import { useNavigate } from 'react-router-dom'
import ShortList from '../components/ShortList'
import { useFetch } from '../hooks/FetchHook'

function Order() {
  const navigate = useNavigate()
  const id = useLoaderData()
  const [searchParams, ] = useSearchParams()
  const message = searchParams.get('message') || ''
  const [order] = useFetch({f: 'fetchOrder', id})

  useEffect(() => {
    if (order && Object.keys(order).length<1) navigate('/')
  }, [order, navigate])

  return (
    <Container className="mt-4">
      {message !== '' ? (
        <Alert variant="success">{message}</Alert>
      ) : null}
      <Row>
        <Col>
          {order?(
            <Card className="mb-4">
              <Card.Body>
                <Card.Title className="text-center fw-bold mb-4">
                  Your receipt for {(new Date(order.order_date)).toLocaleString()}
                </Card.Title>
                <ShortList items={order?.groceries}></ShortList>

              </Card.Body>
            </Card>
          ):null}
        </Col>
      </Row>
    </Container>
  );
}

export default Order;
