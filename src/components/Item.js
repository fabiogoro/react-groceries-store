import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus, faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

function Item({title, image, price, id, detailUrl, user}) {
  const cart = user.cart
  const item = cart.get(id)


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
          
            {item?(
              <>
                <Button
                  onClick={cart.removeCart(id)}
                    size="sm"
                  variant="dark">
                  <FontAwesomeIcon icon={faMinus} /> 
                </Button>
              {' '}{item.quantity}{' '}
                <Button
                  onClick={cart.addCart(id)}
                    size="sm"
                  variant="dark">
                  <FontAwesomeIcon icon={faPlus} />
                </Button>
              </>
            ):(
              <Button
                onClick={cart.addCart(id)}
                variant="dark">
                <FontAwesomeIcon icon={faCartPlus} /> Add to cart
              </Button>
            )}

        </Card.Body>
      </Card>
    </Col>
  );
}

export default Item;
