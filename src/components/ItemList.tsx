import { ReactNode, useState } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Filter from '../components/Filter'
import SortSelector from '../components/SortSelector'
import Offcanvas from 'react-bootstrap/Offcanvas'
import { SearchData, useSearch } from '../hooks/SearchHook'
import { Item } from '../pages/Groceries'

interface Params {
  title:string,
  fetchFunction:(data: SearchData) => Promise<{ results: Item[]; pages: number; }>,
  fetchCategories:()=>Promise<any>,
  itemsFunction:(item: Item, i: number)=>ReactNode
}

function ItemList({ title, fetchFunction, fetchCategories, itemsFunction }:Params) {
  const [show, setShow] = useState(false)

  const [search] = useSearch(fetchFunction)

  const handleShow = () => setShow(true)

  return (
    <Container className="min-vh-100 avoid-footer" fluid>
      <Row className="text-center m-3">
        <Col xs={{ span: 8, offset: 2 }}>
          <h1 className="title">{title}</h1>
        </Col>
        <Col xs="12" className="d-lg-none">
          <Button variant="dark" className="w-100" onClick={handleShow}>
            Filters
          </Button>
        </Col>
        <SortSelector onChange={search.changeSorting} value={search.data.sort_by}></SortSelector>
      </Row>
      <Row>
        <Col lg="2" className="d-none d-lg-block">
          <Filter
            clickHandler={search.changeFilters}
            fetchFunction={fetchCategories}
            values={search.data.categories}
            title="Categories"
          ></Filter>
        </Col>
        <Col lg="10">
          <Row>
            {
              search.items !== undefined ?
                search.items.length > 0 ?
                  search.items.map(itemsFunction) :
                  <Col>No results! Try another query.</Col> :
                <Col>Loading...</Col>
            }
          </Row>
        </Col>
      </Row>
      <Offcanvas show={show}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Filters</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Filter
            clickHandler={search.changeFilters}
            fetchFunction={fetchCategories}
            values={search.data.categories}
            title="Categories"
          ></Filter>
        </Offcanvas.Body>
      </Offcanvas>
    </Container>
  )
}

export default ItemList
