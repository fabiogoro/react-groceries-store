import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Table from 'react-bootstrap/Table'
import Card from 'react-bootstrap/Card'
import { useFetch } from '../hooks/FetchHook'
import { fetchOrders } from '../api/OrderApi'

function Orders() {
  const [orders] = useFetch({ f: fetchOrders })
  console.log(orders)

  return (
    <Container className="mt-4 text-center avoid-footer">
      <Card>
        <Card.Body>
          <Card.Title className="fw-bold mb-4">My orders</Card.Title>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Date</th>
                <th>Order #</th>
                <th>Address</th>
                <th>Total price</th>
                <th>Number of products</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders?.map((o) => (
                <tr>
                  <td>{new Date(o.order_date).toLocaleString()}</td>
                  <td>{o.id}</td>
                  <td>{o.address}</td>
                  <td>{o.total_price}</td>
                  <td>{o.total_products}</td>
                  <td>
                    <a href={`order/${o.id}`}>more info</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default Orders
