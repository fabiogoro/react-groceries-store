import { useEffect, useState } from 'react'
import { useApiContext } from '../contexts/ApiContext'
import { CartData } from './CartHook'

interface fParams {
  id?:number, 
  page?:number, 
  q?:string, 
  categories?:string, 
  sort_by?:string
}

interface Params {
  f:(fParams:fParams)=>Promise<any>, 
  id?:number, 
  page?:number, 
  q?:string, 
  categories?:string, 
  sort_by?:string
}

export interface Data {
  tags?: string,
  name?:string, 
  user_email?:string, 
  pictures?: {path:string}[],
  price?: string,
  title?: string,
  category_name?: string,
  calories?: string,
  carbohydrates?: string,
  fats?: string,
  proteins?: string,
  description?: string,
  id?: string,
  address?: string,
  total_price?: string,
  total_products?: string,
  order_date?: string,
  user_info?: {name:string,email:string,phone:string},
  address_info?: {address:string,city:string},
  groceries?: CartData[]
  category?: string
}

export interface PagedData {
  results: Data[],
  pages: number
}

export const useFetch = ({f, id, page, q, categories, sort_by}:Params) => {
  let [data, setData] = useState<Data|PagedData|undefined>(undefined)
  const api = useApiContext()

  useEffect(() => {
    async function fetchData(){
      setData(await f.bind(api)({id, page, q, categories, sort_by}))
    }
    fetchData()
  }, [id, page, q, categories, sort_by, api, f])

  return [data]
}
