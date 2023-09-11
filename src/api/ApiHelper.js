import * as GroceryApi from './GroceryApi'
import * as CartApi from './CartApi'
import * as UserApi from './UserApi'
import * as OrderApi from './OrderApi'
import * as CategoryApi from './CategoryApi'

const base = 'http://localhost:3000/'

export class ApiHelper {
  constructor(setIsLoading){
    this.setIsLoading = setIsLoading
  }

  async fetchBase(url, method, data) {
    this.setIsLoading(true)
    const config = {
      method: method || 'GET',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    }
    if (data) config.body = JSON.stringify(data)
    const responseJson = await fetch(`${base}${url}`, config)
    const response = await responseJson.json()
    this.setIsLoading(false)
    return response
  }
}
