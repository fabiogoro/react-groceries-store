export async function fetchGroceries({ page, sort_by, categories, q }) {
  return await this.fetchBase(
    `groceries?sort_by=${sort_by}&categories=${categories}&q=${q}&page=${page}`
  )
}
export async function fetchGrocery({id}) {
  if(id){
    return await this.fetchBase(`grocery/${id}`)
  }
}

export async function postGrocery(data){
  return await this.fetchBase(`grocery/`, 'POST', data)
}
