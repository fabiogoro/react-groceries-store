import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Ratio from 'react-bootstrap/Ratio'
import Image from 'react-bootstrap/Image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage } from "@fortawesome/free-solid-svg-icons";

function Item({title, image, price, id, detailUrl}) {
  return (
    <Col xs="12" md="3" className="mb-3">
      <Card>
        <Card.Img className="h-100" fluid rounded src={`https://image.tmdb.org/t/p/w220_and_h330_face/${image}`}>
        </Card.Img>
        <Card.Body className="p-0">
          <Card.Text className="h-100 m-2">
            <strong className="h-50 overflow-y-hidden">{title}</strong><br/>
            {price}<br/>
            <Card.Link href={`${detailUrl}${id}`}>Read more...</Card.Link>
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default Item;
