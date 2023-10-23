import ListGroup from 'react-bootstrap/ListGroup'
import { MouseEventHandler, useEffect, useState } from 'react'

interface Params {
  clickHandler: ({ target }: { target: HTMLInputElement; }) => void,
  fetchFunction: ()=>Promise<any>,
  title:string,
  values:string
}

function Filter({ clickHandler, fetchFunction, title, values }:Params) {
  let [filter, setFilter] = useState<{id:number, name:string, category_sequence:string, children:string, parent_category:string}[]>([])
  const params = new URLSearchParams(document.location.search)
  const categories = params.get('categories')
  const children = (params.get('children') || '').split(',')
  useEffect(() => {
    ;(async () => {
      const results = await fetchFunction()
      setFilter(results)
    })()
  }, [fetchFunction])

  const listClick:MouseEventHandler<HTMLDivElement> = (e)=>{
    if ((e.target as HTMLDivElement).children.length) {
      ((e.target as HTMLDivElement).children[0] as HTMLButtonElement).click()
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
                data-childselector={f.children}
                data-position={i}
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
                data-childselector={f.children}
                defaultChecked={false}
                data-position={i}
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
