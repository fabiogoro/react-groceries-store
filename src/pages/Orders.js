import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import { useFetch } from '../hooks/FetchHook'
import { fetchOrders } from '../api/OrderApi'
import DataTable from '../components/DataTable'
import { useSearchParams } from 'react-router-dom'

function Orders() {
  const [searchParams, ] = useSearchParams()
  const page = parseInt(searchParams.get('page')) || 1
  const q = searchParams.get('q') || ''
  const [orders] = useFetch({ f: fetchOrders, page, q })
  function dataFunction(order) {
    return (
      <tr key={order.id}>
        <td>{new Date(order.order_date).toLocaleString()}</td>
        <td>{order.user_email}</td>
        <td>{order.id}</td>
        <td>{order.address}</td>
        <td>{order.total_price}</td>
        <td>{order.total_products}</td>
        <td>
          <a href={`order/${order.id}`}>more info</a>
        </td>
      </tr>
    )
  }

  return (
    <Container className="mt-4 text-center avoid-footer">
      <Card>
        <Card.Body>
          <Card.Title className="fw-bold mb-4 fs-2">Recent orders</Card.Title>
          <DataTable
            data={orders?.results}
            headers={[
              'Date',
              'User',
              'Order #',
              'Address',
              'Total price',
              'Number of products',
              '',
            ]}
            pages={orders?.pages}
            filterPlaceholder="Filter by user email or order #"
            dataFunction={dataFunction}
          ></DataTable>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default Orders
