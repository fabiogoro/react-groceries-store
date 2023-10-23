import ListGroup from 'react-bootstrap/ListGroup'
import Col from 'react-bootstrap/Col'
import { Cart, CartData } from '../hooks/CartHook';
import { ReactNode } from 'react';

function ShortList({items}:{items?:CartData[]|Cart}) {
  return (
    <ListGroup variant="flush">
      <ListGroup.Item
        key="header"
        className="d-flex justify-content-between align-items-center"
      >
        <Col className="fw-bold">Product</Col>
        <Col className="fw-bold">Price</Col>

        <Col className="fw-bold">Quantity</Col>
      </ListGroup.Item>
      {items?.map((p:CartData):ReactNode => (
        <ListGroup.Item
          key={p.id}
          className="d-flex justify-content-between align-items-center"
        >
          <Col>{p.title}</Col>
          <Col>${(p.price * p.quantity).toFixed(2)}</Col>

          <Col>{p.quantity}</Col>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}

export default ShortList;
