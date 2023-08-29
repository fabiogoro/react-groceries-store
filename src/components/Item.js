import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Ratio from 'react-bootstrap/Ratio'
import Image from 'react-bootstrap/Image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage } from "@fortawesome/free-solid-svg-icons";

function Item({title, image, price, id, detailUrl}) {
  return (
    <Col xs="12" lg="3" md="6" className="mt-3">
      <Card>
        <Card.Img className="h-100" src={`${image}`} style={{maxHeight: 120}}>
        </Card.Img>
        <Card.Body className="text-center">
          <Card.Title>
            {title}
          </Card.Title>
          <Card.Title>
            {price}
          </Card.Title>
          <Card.Text>
            <Card.Link href={`${detailUrl}${id}`}>Read more...</Card.Link>
          </Card.Text>
          <Button variant="dark">Add to cart</Button>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default Item;
