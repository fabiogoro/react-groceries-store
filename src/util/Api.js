const base = 'http://localhost:3000/'

export async function fetchGroceries({page, sort_by, categories, q}){
  const response = await fetch(
    `${base}groceries?sort_by=${sort_by}&categories=${categories}&q=${q}&page=${page}`)
  return (await response.json())
}

export async function fetchGrocery(id){
  const response = await fetch(
    `${base}grocery/${id}`)
  return (await response.json())
}

export async function fetchCategories(){
  const response = await fetch(
    `${base}categories`)
  return (await response.json())
}

export async function postLogin(data){
  const response = await fetch(
    `${base}login`, {
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

export async function postLogoff(){
  const response = await fetch(
    `${base}logoff`, {
      method: 'POST',
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
  return await response.json()
}

export async function postResetPassword(data){
  const response = await fetch(
    `${base}reset`, {
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

export async function postNewPassword(data){
  const response = await fetch(
    `${base}reset/password`, {
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

export async function postSignUp(data){
  const response = await fetch(
    `${base}user`, {
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
    `${base}user`, {
      method: 'GET',
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      }})
  return (await response.json())
}

export async function fetchCart(){
  const response = await fetch(
    `${base}cart`, {
      method: 'GET',
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      }})
  return (await response.json())
}

export async function postAddCart(id){
  const response = await fetch(
    `${base}cart/add/${id}`, {
      method: 'POST',
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
  return await response.json()
}


export async function postRemoveCart(id){
  const response = await fetch(
    `${base}cart/remove/${id}`, {
      method: 'POST',
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
  return (await response.json())
}
