import { useState, useEffect } from 'react'
import { fetchUser, postLogoff } from '../util/Api'

export const useUser = () => {
  const user = new User(useState(undefined))

  useEffect(() => {
    user.loadUser()
  }, [])

  return [user]
}

class User {
  constructor([data, setData]) {
    this.data = data
    this.setData = setData
  }

  async loadUser() {
    this.setData((await fetchUser()))
  }

  get name(){
    return this.data?.name
  }
  
  get isLoggedIn(){
    return (this.data===undefined || this.name)
  }

  logoff(){
    return ()=>{
      postLogoff()
      window.location.replace('/')
    }
  }
}
