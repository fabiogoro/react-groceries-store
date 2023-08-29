import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useLoaderData } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'

function Cart() {
  const id = useLoaderData()
  let [cart, setCart] = useState([])
  async function fetchData() {
    setCart([
      {
        product_title: 'Apple',
        product_thumbnail:
          'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.KWVhl0nuomQtvJd1Js719wHaE6%26pid%3DApi&f=1&ipt=320abf549b8d5c8fe12cb6846fd2abaa41f0dae209e44fec8938baf0ad22e57d&ipo=images',
        product_price: 10,
      },
      {
        product_title: 'Banana',
        product_thumbnail:
          'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.KWVhl0nuomQtvJd1Js719wHaE6%26pid%3DApi&f=1&ipt=320abf549b8d5c8fe12cb6846fd2abaa41f0dae209e44fec8938baf0ad22e57d&ipo=images',
        product_price: 10,
      },
      {
        product_title: 'Carrot',
        product_thumbnail:
          'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.KWVhl0nuomQtvJd1Js719wHaE6%26pid%3DApi&f=1&ipt=320abf549b8d5c8fe12cb6846fd2abaa41f0dae209e44fec8938baf0ad22e57d&ipo=images',
        product_price: 10,
      },
    ])
  }
  useEffect(() => {
    fetchData()
  }, [])

  return (
    <Container className="mt-4">
      <Row>
        <Col lg="6" xs="12" className="mb-4">
          <ListGroup>
            {cart.map((p) => (
              <ListGroup.Item className="d-flex justify-content-between align-items-center">
                <div>
                  <Image
                    className="card-img-top img-fluid"
                    src={p.product_thumbnail}
                    alt="..."
                    style={{ width: 120, height: 120 }}
                  />
                </div>

                <div className="fw-bold">{p.product_title}</div>

                <div>
                  <Button variant="outline-dark" size="sm">
                    <FontAwesomeIcon icon={faMinus} />
                  </Button>{' '}
                  10{' '}
                  <Button variant="outline-dark" size="sm">
                    <FontAwesomeIcon icon={faPlus} />
                  </Button>
                  <br />
                  <br />${p.product_price.toFixed(2)}
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>

        <Col lg={6} xs={12}>
          <Card>
            <Card.Body className="text-center">
              <Card.Title className="fw-bold">Total</Card.Title>

              <Card.Title className="mt-4">30 items</Card.Title>

              <Card.Title className="mb-4">$30.00</Card.Title>
              <Button variant="dark" href="checkout.html">
                Place order
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Cart
