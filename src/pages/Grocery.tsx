import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'
import { useLoaderData } from 'react-router-dom'
import Carousel from 'react-bootstrap/Carousel'
import { Data, useFetch } from '../hooks/FetchHook'
import { fetchGrocery } from '../api/GroceryApi'
import { useUserContext } from '../contexts/UserContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'

function Grocery() {
  const id = parseInt(useLoaderData() as string)
  const user = useUserContext()
  const item = user?.cart?.get(id)

  const [grocery] = useFetch({ f: fetchGrocery, id })

  return (
    <Container className="mt-4 avoid-footer">
      <Row>
        <Col>
          {grocery ? (
            <Card>
              <Card.Body>
                <Card className="py-4">
                  <Row>
                    <Col>
                      <Carousel variant="dark" className="h-100 text-center">
                        {(grocery as Data).pictures?.map((p, i) => (
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
                      <Card.Body className="ms-4">
                        <Card.Title className="fs-2">
                          <strong>{(grocery as Data).title}</strong>
                        </Card.Title>
                        <Card.Title>Buy this product</Card.Title>
                        <Card.Text>Each unity: ${parseInt((grocery as Data).price||'0').toFixed(2)}</Card.Text>
                            
                            {item ? (
                              <>
                                <Button
                                  onClick={user?.cart?.removeCart(id)}
                                  size="sm"
                                  variant="dark"
                                >
                                  <FontAwesomeIcon icon={faMinus} />
                                </Button>{' '}
                                {item.quantity}{' '}
                                <Button
                                  onClick={user?.cart?.addCart(id)}
                                  size="sm"
                                  variant="dark"
                                >
                                  <FontAwesomeIcon icon={faPlus} />
                                </Button>
                              </>
                            ) : (
                              <Button onClick={user?.cart?.addCart(id)} variant="dark">
                                <FontAwesomeIcon icon={faCartPlus} /> Add to cart
                              </Button>
                            )}
                      </Card.Body>
                    </Col>
                  </Row>
                </Card>
                <Card className="mt-4">
                  <Card.Body>
                    <Card.Title>
                      <strong>Categories: {(grocery as Data).category_name}</strong>
                    </Card.Title>
                  </Card.Body>
                </Card>
                <Card className="mt-4">
                  <Card.Body>
                    <Card.Title>
                      <strong>Description:</strong>
                    </Card.Title>
                    <Card.Text>
                      {(grocery as Data).description}
                    </Card.Text>
                  </Card.Body>
                </Card>
                {(grocery as Data).calories &&
                    (grocery as Data).carbohydrates &&
                    (grocery as Data).fats &&
                    (grocery as Data).proteins ? (
                      <Card className="mt-4">
                        <Card.Body>
                          <Card.Title>
                            <strong>Nutrition facts (per 100g):</strong>
                          </Card.Title>
                          <Card.Text>
                            <p>
                              Calories: {(grocery as Data).calories} kcal
                              <br />
                              Carbohydrates: {(grocery as Data).carbohydrates} g
                              <br />
                              Proteins: {(grocery as Data).proteins} g
                              <br />
                              Fats: {(grocery as Data).fats} g
                            </p>
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    ) : null}
              </Card.Body>
            </Card>
          ) : null}
        </Col>
      </Row>
    </Container>
  )
}

export default Grocery
