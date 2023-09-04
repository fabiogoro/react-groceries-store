import ListGroup from 'react-bootstrap/ListGroup'
import { useEffect, useState } from 'react'

function Filter({ clickHandler, fetchFunction, title, values }) {
  let [filter, setFilter] = useState([])
  useEffect(() => {
    ;(async () => {
      const results = await fetchFunction()
      setFilter(results)
    })()
  }, [])

  function listClick(e) {
    if (e.target.children.length) {
      e.target.children[0].click()
    }
  }

  return (
    <ListGroup as="ul">
      <ListGroup.Item variant="dark" as="li" active>
        {title}
      </ListGroup.Item>
      {filter.length ? (
        filter.map((f, i) => (
          <ListGroup.Item key={i} as="li" onClick={listClick}>
            <input
              id={f.name}
              type="checkbox"
              value={f.id}
              defaultChecked={values.split(',').includes(`${f.id}`)}
              position={i}
              onChange={clickHandler}
              className="me-2"
            />
            <label htmlFor={f.name}>{f.name}</label>
          </ListGroup.Item>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </ListGroup>
  )
}

export default Filter
