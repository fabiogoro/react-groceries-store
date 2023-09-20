import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'
import { useLoaderData } from 'react-router-dom'
import Carousel from 'react-bootstrap/Carousel'
import { useFetch } from '../hooks/FetchHook'
import { fetchGrocery } from '../api/GroceryApi'
import { useUserContext } from '../contexts/UserContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'

function Grocery() {
  const id = useLoaderData()
  const user = useUserContext()
  const item = user.cart.get(parseInt(id))

  const [grocery] = useFetch({ f: fetchGrocery, id })

  return (
    <Container className="mt-4">
      <Row>
        <Col>
          {grocery ? (
            <Card>
              <Row>
                <Col>
                  <Carousel variant="dark" className="h-100 text-center">
                    {grocery.pictures?.map((p, i) => (
                      <Carousel.Item className="h-100" key={i}>
                        <Image
                          className="h-100"
                          fluid
                          src={`${p.path}`}
                          alt="First slide"
                        />
                      </Carousel.Item>
                    ))}
                  </Carousel>
                </Col>
                <Col>
                  <Card.Body>
                    <Card.Title>
                      <strong>{grocery.title}</strong>
                      <br />${parseInt(grocery.price).toFixed(2)}
                    </Card.Title>
                    <p>
                      <strong>Categories: </strong>
                      <span>{grocery.category_name}</span>
                    </p>
                    <p>
                      <strong>Description:</strong>
                      <br />
                      {grocery.description}
                    </p>
                    {grocery.calories &&
                    grocery.carbohydrates &&
                    grocery.fats &&
                    grocery.proteins ? (
                      <p>
                        <strong>Nutrition facts (per 100g):</strong>
                        <br />
                        Calories: {grocery.calories} kcal
                        <br />
                        Carbohydrates: {grocery.carbohydrates} g
                        <br />
                        Proteins: {grocery.proteins} g
                        <br />
                        Fats: {grocery.fats} g
                      </p>
                    ) : null}
                    {item ? (
                      <>
                        <Button
                          onClick={user.cart.removeCart(id)}
                          size="sm"
                          variant="dark"
                        >
                          <FontAwesomeIcon icon={faMinus} />
                        </Button>{' '}
                        {item.quantity}{' '}
                        <Button
                          onClick={user.cart.addCart(id)}
                          size="sm"
                          variant="dark"
                        >
                          <FontAwesomeIcon icon={faPlus} />
                        </Button>
                      </>
                    ) : (
                      <Button onClick={user.cart.addCart(id)} variant="dark">
                        <FontAwesomeIcon icon={faCartPlus} /> Add to cart
                      </Button>
                    )}
                  </Card.Body>
                </Col>
              </Row>
            </Card>
          ) : null}
        </Col>
      </Row>
    </Container>
  )
}

export default Grocery
