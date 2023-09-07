import { useState } from 'react'
import { Cart } from '../hooks/CartHook'
import { useLoaderContext } from '../contexts/LoaderContext'
import { useApiContext } from '../contexts/ApiContext'

export const useUser = () => {
  const user = new User(useState(undefined), useLoaderContext(), useApiContext())

  if(!user.data){
    user.loadUser()
  }

  return [user]
}

class User {
  constructor([data, setData], loader, api) {
    this.data = data
    this.setData = setData
    this.cart = new Cart(this, loader, api)
    this.api = api
    this.loaded = false
  }

  async loadUser() {
    this.setData((await this.api.fetchUser()))
    this.loaded = true
  }

  get name(){
    return this.data?.name
  }

  get isLoggedIn(){
    return (this.data===undefined || this.name)
  }

  logoff(){
    return ()=>{
      this.api.postLogoff()
      window.location.replace('/')
    }
  }
}
