import Table from 'react-bootstrap/Table'
import Pagination from 'react-bootstrap/Pagination'
import { useSearchParams } from 'react-router-dom'

function DataTable({ data, headers, dataFunction, pages }) {
  const [searchParams, setSearchParams] = useSearchParams()
  const page = parseInt(searchParams.get('page')) || 1
  return (
    <div className="text-center">
      <Table striped bordered hover>
        <thead>
          <tr>
            {headers.map((h) => (
              <th>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>{data?.map(dataFunction)}</tbody>
      </Table>
      <Pagination className="justify-content-center">
        {page > 1 ? (
          <Pagination.Prev
            onClick={() => setSearchParams({ page: page - 1 })}
          />
        ) : null}
        <Pagination.Item active>{page}</Pagination.Item>
        {page < pages ? (
          <Pagination.Next
            onClick={() => setSearchParams({ page: page + 1 })}
          />
        ) : null}
      </Pagination>
    </div>
  )
}

export default DataTable
