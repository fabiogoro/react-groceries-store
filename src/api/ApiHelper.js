import * as GroceryApi from './GroceryApi'
import * as CartApi from './CartApi'
import * as UserApi from './UserApi'
import * as OrderApi from './OrderApi'
import * as CategoryApi from './CategoryApi'

const base = 'http://localhost:3000/'

export class ApiHelper {
  async fetchBase(url, method, data) {
    const config = {
      method: method || 'GET',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    }
    if (data) config.body = JSON.stringify(data)
    const response = await fetch(`${base}${url}`, config)
    return await response.json()
  }
}

Object.assign(ApiHelper.prototype, { ...GroceryApi })
Object.assign(ApiHelper.prototype, { ...CartApi })
Object.assign(ApiHelper.prototype, { ...UserApi })
Object.assign(ApiHelper.prototype, { ...OrderApi })
Object.assign(ApiHelper.prototype, { ...CategoryApi })
