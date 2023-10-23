import { FormEvent, ReactNode } from 'react'
import Pagination from 'react-bootstrap/Pagination'
import Table from 'react-bootstrap/Table'
import { useSearchParams } from 'react-router-dom'
import { Data } from '../hooks/FetchHook'

interface Params {
  data?:Data[],
  headers:string[],
  dataFunction: (data:Data)=>ReactNode,
  pages?:number,
  filterPlaceholder:string
}

function DataTable({ data, headers, dataFunction, pages, filterPlaceholder }:Params) {
  const [searchParams, setSearchParams] = useSearchParams()
  const pageParam = searchParams.get('page')
  const page = pageParam?parseInt(pageParam):1
  const q = searchParams.get('q') || ''
  function submitSearch(e:FormEvent) {
    e.preventDefault()
    setSearchParams({ q: ((e.target as HTMLFormElement).elements[0] as HTMLInputElement).value })
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
          defaultValue={'' || q}
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
            onClick={() => setSearchParams({q, page: (page - 1).toString() })}
          />
        ) : null}
        <Pagination.Item active>{page}</Pagination.Item>
        {page < (pages||0) ? (
          <Pagination.Next
            onClick={() => setSearchParams({q, page: (page + 1).toString() })}
          />
        ) : null}
      </Pagination>
    </div>
  )
}

export default DataTable
