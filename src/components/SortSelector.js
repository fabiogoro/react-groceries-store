import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'

function SortSelector({onChange}) {
  return (
    <Col xs="12" lg="2">
      <label htmlFor="sort">Sort by:</label>
      <Form.Select onChange={onChange} id="sort" aria-label="Sort by">
        <option value="title.asc">Alphabetical (A-Z)</option>
        <option value="title.desc">Alphabetical (Z-A)</option>
        <option value="price.asc">Price (Low-High)</option>
        <option value="price.desc">Price (High-Low)</option>
      </Form.Select>
    </Col>
  );
}

export default SortSelector;
