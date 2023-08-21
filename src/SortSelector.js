import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'

function SortSelector({onChange}) {
  return (
    <Col xs="2">
      <label htmlFor="sort">Sort by:</label>
      <Form.Select onChange={onChange} id="sort" aria-label="Sort by">
        <option value="popularity.desc">Popularity (High-Low)</option>
        <option value="popularity.asc">Popularity (Low-High)</option>
        <option value="revenue.desc">Revenue (High-Low)</option>
        <option value="revenue.asc">Revenue (Low-High)</option>
        <option value="vote_average.desc">Rating (High-Low)</option>
        <option value="vote_average.asc">Rating (Low-High)</option>
        <option value="primary_release_date.desc">Most recent</option>
        <option value="primary_release_date.asc">Least recent</option>
      </Form.Select>
    </Col>
  );
}

export default SortSelector;
