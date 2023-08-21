import ListGroup from 'react-bootstrap/ListGroup'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useLoaderData } from 'react-router-dom'
import { fetchGrocery } from './util/Api'
import { useEffect, useState } from "react"
import Carousel from 'react-bootstrap/Carousel'

function Grocery() {
  let [grocery, setGrocery] = useState(undefined)
  const id = useLoaderData();

  const fetchData = async () => {
      const result = await fetchGrocery(id)
      setGrocery(result)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <Container className="mt-4">
      <Row>
        <Col>
          {grocery?(
            <Card>
              <Row>
                <Col>
                  <Carousel variant="dark" className="vh-50 text-center">
                    {grocery.images.posters.map((img,i)=>(
                      <Carousel.Item key={i}>
                        <img
                          src={`https://image.tmdb.org/t/p/w500/${img.file_path}`}
                          alt="First slide"
                        />
                      </Carousel.Item>
                    ))}
                  </Carousel>
                </Col>
                <Col>
                  <Card.Body>
                    <Card.Title>
                      {grocery.title} ({(new Date(grocery.release_date)).getFullYear()})
                      <br/>
                      Rating: {Math.round(grocery.vote_average*10)}%
                    </Card.Title>
                    <p>
                      <strong>Genres: </strong>
                      {grocery.genres.map((genre,i)=>(
                        <span key={i}>{`${i?', ':''}${genre.name}`}</span>
                      ))}
                    </p>
                    <p>
                      <strong>Overview:</strong>
                      <br/>
                      {grocery.overview}
                    </p>
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
