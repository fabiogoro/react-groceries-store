import { useEffect, useState } from 'react'
import { useApiContext } from '../contexts/ApiContext'


export const useFetch = ({f, id, page, q, categories, sort_by}) => {
  let [data, setData] = useState(undefined)
  const api = useApiContext()

  useEffect(() => {
    async function fetchData(){
      setData(await f.bind(api)({id, page, q, categories, sort_by}))
    }
    fetchData()
  }, [id, page, q, categories, sort_by, api, f])

  return [data]
}
