import { useEffect, useState } from "react"
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Filter from '../components/Filter'
import SortSelector from '../components/SortSelector'
import Offcanvas from 'react-bootstrap/Offcanvas'
import Modal from 'react-bootstrap/Modal'
import Spinner from 'react-bootstrap/Spinner'

function ItemList({title, fetchFunction, fetchCategories, itemsFunction}) {
  let [items, setItems] = useState([])
  let [isLoading, setIsLoading] = useState(false)
  let [page, setPage] = useState(1)
  let [sort_by, setSort_by] = useState('title.asc')
  let [categories, setCategories] = useState({})
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const fetchData = async (sort_by='title.asc', page=0, categories={}) => {
    setIsLoading(true)
    try {
      page++
      const results = await fetchFunction({page, sort_by, categories})
      setSort_by(sort_by)
      setCategories(categories)
      setItems([...items, ...results])
      setPage(page)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || isLoading) {
      return
    }
    fetchData(sort_by, page, categories)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoading]);

  async function changeSorting(e){
    items = []
    fetchData(e.target.value, 0, categories)
  }

  async function changeFilters(e){
    items = []
    if(categories[e.target.getAttribute(['position'])]){
      delete categories[e.target.getAttribute(['position'])]
    } else {
      categories[e.target.getAttribute(['position'])] = e.target.value
    }
    fetchData(sort_by, 0, categories)
  }

  return (
    <Container className="min-vh-100" fluid>
      <Row className="text-center m-3">
        <Col xs={{ span: 8, offset: 2 }}>
          <h1>{title}</h1>
        </Col>
        <Col xs="12" className="d-lg-none">
          <Button variant="dark" className="w-100" onClick={handleShow}>
            Filters
          </Button>
        </Col>
        <SortSelector onChange={changeSorting}></SortSelector>
      </Row>
      <Row>
        <Col lg="2" className="d-none d-lg-block">
          <Filter clickHandler={changeFilters} fetchFunction={fetchCategories} title="Categories"></Filter>
        </Col>
        <Col lg="10">
          <Row>
            {items.length?items.map(itemsFunction):(
              <Col>
                Loading...
              </Col>
            )}
          </Row>
        </Col>
      </Row>
      <Offcanvas show={show}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Filters</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Filter clickHandler={changeFilters} fetchFunction={fetchCategories} title="Categories"></Filter>
        </Offcanvas.Body>
      </Offcanvas>
      <Modal show={isLoading} centered contentClassName="bg-transparent border-0" className="d-flex">
        <Spinner className=""></Spinner>
      </Modal>
    </Container>
  )
}

export default ItemList;
