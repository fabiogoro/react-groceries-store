import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'

function Contact() {
  return (
    <Container className="mt-4">
      <Row>
        <Col>
          <Card>
            <Card.Body className="text-center">
              <Card.Title>
                <strong>Contact us</strong>
              </Card.Title>
              <Card.Text className="p-4 m-4">
                In any case, you can reach us through the following channels:
                <br />
                Phone: +1 111 111111 1111
                <br />
                Email: groceries@internet.co
                <br />
                Address: Some st., Somewhere
                <br />
                <iframe
                  title="map"
                  src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d60880770.02986936!2d18.827164416902114!3d21.355728397133596!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sbr!4v1695209140272!5m2!1sen!2sbr"
                  loading="lazy"
                ></iframe>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Contact
