import { useState, useEffect } from 'react'
import { Cart } from '../hooks/CartHook'
import { useApiContext } from '../contexts/ApiContext'
import { fetchUser, postLogoff } from '../api/UserApi'

export const useUser = () => {
  const user = new User(useState(undefined), useApiContext())

  useEffect(()=>{
    if(!user.data){
      user.loadUser()
    }
  })

  return [user]
}

class User {
  constructor([data, setData], api) {
    this.data = data
    this.setData = setData
    this.cart = new Cart(this, api)
    this.api = api
    this.loaded = false
  }

  async loadUser() {
    this.setData((await fetchUser.bind(this.api)()))
    this.loaded = true
  }

  get name(){
    return this.data?.name
  }

  get isLoggedIn(){
    return (this.data===undefined || this.name)
  }

  get isAdmin(){
    return (this.data===undefined || this.data.is_admin)
  }

  logoff(){
    return ()=>{
      postLogoff.bind(this.api)()
      window.location.replace('/')
    }
  }
}
