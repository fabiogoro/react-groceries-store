import { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Filter from '../components/Filter'
import SortSelector from '../components/SortSelector'
import Offcanvas from 'react-bootstrap/Offcanvas'
import Modal from 'react-bootstrap/Modal'
import Spinner from 'react-bootstrap/Spinner'
import { useSearch } from '../hooks/SearchHook'

function ItemList({ title, fetchFunction, fetchCategories, itemsFunction }) {
  const [show, setShow] = useState(false)

  const [search] = useSearch(fetchFunction)

  const handleShow = () => setShow(true)

  return (
    <Container className="min-vh-100 avoid-footer" fluid>
      <Row className="text-center m-3">
        <Col xs={{ span: 8, offset: 2 }}>
          <h1>{title}</h1>
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
            {search.items.length ? search.items.map(itemsFunction) : <Col>Loading...</Col>}
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
      <Modal
        show={search.isLoading}
        centered
        contentClassName="bg-transparent border-0"
        className="d-flex"
      >
        <Spinner className=""></Spinner>
      </Modal>
    </Container>
  )
}

export default ItemList
