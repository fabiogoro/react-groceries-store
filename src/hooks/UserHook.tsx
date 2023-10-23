import { useState, useEffect } from 'react'
import { Cart, CartData } from '../hooks/CartHook'
import { useApiContext } from '../contexts/ApiContext'
import { fetchUser, postLogoff } from '../api/UserApi'

export const useUser = () => {
  const [data, setData] = useState<UserData|undefined>(undefined)
  const user = new User(data, setData)

  useEffect(()=>{
    if(!user.data){
      user.loadUser()
    }
  })

  return [user]
}

export interface Address {
  id:number,
  address:string, 
  city:string, 
  country:string,
  zip_code: string,
  state: string
}

export interface UserData {
  name:string,
  email:string,
  phone:string,
  is_admin:boolean,
  addresses:Address[], 
  cart:CartData[]
}

export class User {
  constructor(
    public data: UserData | undefined,
    public setData: (data: UserData) => void,
    public api = useApiContext(),
    public loaded= false,
    public cart?: Cart
  ) {
    this.cart = new Cart(this, api)
  }

  async loadUser() {
    this.setData((await fetchUser.bind(this.api)()))
    this.loaded = true
  }

  get name() {
    return this.data?.name
  }

  get isLoggedIn() {
    return (this.data === undefined || this.name)
  }

  get isAdmin() {
    return (this.data === undefined || this.data.is_admin)
  }

  logoff() {
    return () => {
      postLogoff.bind(this.api)()
      window.location.replace('/')
    }
  }
}
