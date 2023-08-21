import Col from 'react-bootstrap/Col'
import ListGroup from 'react-bootstrap/ListGroup'
import { useEffect, useState } from "react"

function Filter({clickHandler, fetchFunction}) {
  let [genres, setGenres] = useState([])
  useEffect(() => {
    (async ()=>{
      const results = await fetchFunction()
      setGenres(results)
    })()
  }, [])

  function listClick(e){
    if(e.target.children.length){
      e.target.children[0].click()
    }
  }

  return (
    <Col xs="2">
      <ListGroup as="ul">
        <ListGroup.Item as="li" active>
          Genres
        </ListGroup.Item>
        {genres.length?genres.map((genre,i)=>(
          <ListGroup.Item key={i} as="li" onClick={listClick}>
            <input 
              id={genre.name} 
              type="checkbox" 
              value={genre.id} 
              position={i} 
              onChange={clickHandler}
              className="me-2"/> 
            <label htmlFor={genre.name}>{genre.name}</label>
          </ListGroup.Item>
        )):<p>Loading...</p>}
      </ListGroup>
    </Col>
  );
}

export default Filter;
