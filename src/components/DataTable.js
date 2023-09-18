import Table from 'react-bootstrap/Table'
import Pagination from 'react-bootstrap/Pagination'
import { useSearchParams } from 'react-router-dom'

function DataTable({ data, headers, dataFunction, pages, filterPlaceholder }) {
  const [searchParams, setSearchParams] = useSearchParams()
  const page = parseInt(searchParams.get('page')) || 1
  const q = searchParams.get('q') || ''
  function submitSearch(e) {
    e.preventDefault()
    setSearchParams({ q: e.target.elements[0].value })
  }
  return (
    <div className="text-center">
      <form
        className="d-flex w-100 m-4 justify-content-center"
        role="search"
        onSubmit={submitSearch}
      >
        <input
          className="form-control me-2 w-25"
          aria-label="Search"
          placeholder={filterPlaceholder||"Filter"}
          name="q"
          id="q"
          defaultValue={'' || searchParams.get('q')}
          type="search"
        />{' '}
        <button className="btn btn-outline-secondary" type="submit">
          Search
        </button>
      </form>
      <Table striped bordered hover>
        <thead>
          <tr>
            {headers.map((h) => (
              <th key={h}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>{data?.map(dataFunction)}</tbody>
      </Table>
      <Pagination className="justify-content-center">
        {page > 1 ? (
          <Pagination.Prev
            onClick={() => setSearchParams({q, page: page - 1 })}
          />
        ) : null}
        <Pagination.Item active>{page}</Pagination.Item>
        {page < pages ? (
          <Pagination.Next
            onClick={() => setSearchParams({q, page: page + 1 })}
          />
        ) : null}
      </Pagination>
    </div>
  )
}

export default DataTable
