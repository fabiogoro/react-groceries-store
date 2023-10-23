interface GroceriesParams {
  page?: number,
  sort_by?: string,
  categories?: string,
  q?: string
}

export async function fetchGroceries(this:any, { page, sort_by, categories, q }:GroceriesParams) {
  return await this.fetchBase(
    `groceries?sort_by=${sort_by}&categories=${categories}&q=${q}&page=${page}`
  )
}
export async function fetchGrocery(this:any, {id}:{id?:number}) {
  if(id){
    return await this.fetchBase(`grocery/${id}`)
  }
}

export async function postGrocery(this:any, data:{}){
  return await this.fetchBase(`grocery/`, 'POST', data)
}
