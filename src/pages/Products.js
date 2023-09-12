import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import { useFetch } from '../hooks/FetchHook'
import { fetchGroceries } from '../api/GroceryApi'
import DataTable from '../components/DataTable'
import { useSearchParams } from 'react-router-dom'

function Products() {
  const [searchParams, setSearchParams] = useSearchParams()
  const page = parseInt(searchParams.get('page')) || 1
  const [products] = useFetch({ f: fetchGroceries, page, q: '', categories: '', sort_by: 'title.asc' })
  function dataFunction(product) {
    return (
      <tr>
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
            dataFunction={dataFunction}
          ></DataTable>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default Products
