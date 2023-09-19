import ListGroup from 'react-bootstrap/ListGroup'
import { useEffect, useState } from 'react'

function Filter({ clickHandler, fetchFunction, title, values }) {
  let [filter, setFilter] = useState([])
  const params = new URLSearchParams(document.location.search)
  const categories = params.get('categories')
  const children = (params.get('children') || '').split(',')
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
    <ListGroup as="ul" className="d-flex flex-nowrap">
      <ListGroup.Item variant="dark" as="li" active>
        {title}
      </ListGroup.Item>
      {filter.length ? (
        filter.map((f, i) =>
          categories && children.includes(f.id.toString()) ? (
            <ListGroup.Item
              key={i}
              as="li"
              onClick={listClick}
              active={children[0] === `${f.id}`}
              className={children[0] === `${f.id}` ? 'order-1' : 'order-2'}
            >
              <input
                id={f.name}
                type="checkbox"
                value={f.category_sequence || f.id}
                defaultChecked={children[0] === `${f.id}`}
                childselector={f.children}
                position={i}
                onChange={clickHandler}
                className="me-2"
              />
              <label htmlFor={f.name}>{f.name}</label>
            </ListGroup.Item>
          ) : !categories && !f.parent_category ? (
            <ListGroup.Item key={i} as="li" onClick={listClick}>
              <input
                id={f.name}
                type="checkbox"
                value={f.category_sequence || f.id}
                childselector={f.children}
                defaultChecked={false}
                position={i}
                onChange={clickHandler}
                className="me-2"
              />
              <label htmlFor={f.name}>{f.name}</label>
            </ListGroup.Item>
          ) : null
        )
      ) : (
        <p>Loading...</p>
      )}
    </ListGroup>
  )
}

export default Filter
