const key = 'e03c9290bb3b8e9ce64eb0074847b13d'
const base = 'https://api.themoviedb.org/3/'

export async function fetchGroceries({page, genres, sort_by}){
  const response = await fetch(
    `${base}discover/movie?page=${page}&sort_by=${sort_by}&with_genres=${genres}&api_key=${key}`)
  return (await response.json()).results
}

export async function fetchGrocery(id){
  const response = await fetch(
    `${base}movie/${id}?append_to_response=images&api_key=${key}`)
  return (await response.json())
}

export async function fetchCategories(){
  const response = await fetch(
    `${base}genre/movie/list?api_key=${key}`)
  return (await response.json()).genres
}

const base2 = 'http://localhost:3000/'

export async function postLogin(data){
  const response = await fetch(
    `${base2}login`, {
      method: 'POST',
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    })
  return await response.json()
}

export async function fetchUser(){
  const response = await fetch(
    `${base2}user`, {
      method: 'GET',
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      }})
  return (await response.json())
}
