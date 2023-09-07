import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { useLoaderData } from 'react-router-dom'
import Carousel from 'react-bootstrap/Carousel'
import { useFetch } from '../hooks/FetchHook'

function Grocery() {
  const id = useLoaderData()

  const [grocery] = useFetch({f: 'fetchGrocery', id})

  return (
    <Container className="mt-4">
      <Row>
        <Col>
          {grocery?(
            <Card>
              <Row>
                <Col>
                  <Carousel variant="dark" className="vh-50 text-center">
                    {grocery.pictures?.map((p,i)=>(
                      <Carousel.Item key={i}>
                        <img
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
                      <strong>
                        {grocery.title}
                      </strong>
                      <br/>
                      ${parseInt(grocery.price).toFixed(2)}
                    </Card.Title>
                    <p>
                      <strong>Category: </strong>
                      <span>{grocery.category_name}</span>
                    </p>
                    <p>
                      <strong>Description:</strong>
                      <br/>
                      {grocery.description}
                    </p>
                    <Button variant="dark">Add to cart</Button>
                  </Card.Body>
                </Col>
              </Row>
            </Card>
          ):null}
        </Col>
      </Row>
    </Container>
  );
}

export default Grocery;
