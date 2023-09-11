import { useEffect, useState } from 'react'
import { useApiContext } from '../contexts/ApiContext'


export const useFetch = ({f, id}) => {
  let [data, setData] = useState(undefined)
  const api = useApiContext()

  useEffect(() => {
    async function fetchData(){
      setData(await f.bind(api)({id}))
    }
    fetchData()
  }, [id, api, f])

  return [data]
}
