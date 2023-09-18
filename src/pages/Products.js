import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { useFetch } from '../hooks/FetchHook'
import { fetchGroceries } from '../api/GroceryApi'
import DataTable from '../components/DataTable'
import { useSearchParams } from 'react-router-dom'
import { useAdmin } from '../hooks/AdminHook'

function Products() {
  const [searchParams, ] = useSearchParams()
  const page = parseInt(searchParams.get('page')) || 1
  const q = searchParams.get('q') || ''
  const [products] = useFetch({ f: fetchGroceries, page, q, categories: '', sort_by: 'title.asc' })
  useAdmin()
  function dataFunction(product) {
    return (
      <tr key={product.id}>
        <td>{product.title}</td>
        <td>{product.price}</td>
        <td>{product.category_name}</td>
        <td>{product.tags}</td>
        <td>
          <a href={`product/${product.id}`}>edit</a>
        </td>
      </tr>
    )
  }

  return (
    <Container className="mt-4 text-center avoid-footer">
      <Card>
        <Card.Body>
          <Card.Title className="fw-bold mb-4">Products</Card.Title>
          <Button href="/product" className="m-2">Add product</Button>
          <DataTable
            data={products?.results}
            headers={[
              'Title',
              'Price',
              'Category',
              'Tags',
              '',
            ]}
            pages={products?.pages}
            filterPlaceholder="Filter by title"
            dataFunction={dataFunction}
          ></DataTable>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default Products
