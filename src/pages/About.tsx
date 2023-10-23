import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'

function About() {
  return (
    <Container className="mt-4">
      <Row>
        <Col>
          <Card>
            <Card.Body className="text-center">
              <Card.Title>
                <strong className="fs-2">About us</strong>
              </Card.Title>
              <Card.Text className="p-4 m-4">
                We are an online grocery store where you can find everything you
                need for your daily routine, without needing to leave your home
                and standing in long lines. Just select your products and place
                an order, we will handle the delivery and you will receive
                everything you ordered at your door.
              </Card.Text>
              <Card.Text className="p-4 m-4">
                * This is a web application, created using React frontend and
                Node backend. It was created during the 7 months bootcamp
                Brightcode, offered to jews wanting to immigrate to Israel. It
                was an intense study program covering several topics of software
                development and the result can be seen through this application.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default About
