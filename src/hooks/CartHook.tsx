import { ReactNode } from 'react'
import { ApiHelper } from '../api/ApiHelper'
import { postAddCart, postRemoveCart } from '../api/CartApi'
import { User } from './UserHook'

export interface CartData {
 title:string, 
 thumbnail: string | undefined,
 quantity:number,
 price:number,
 id:number
}

export class Cart {
  constructor(public user:User, public api:ApiHelper|null) {
  }

  addCart(id:number) {
    return async () => {
      if (this.user!==undefined && this.user.data!==undefined && this.user.name) {
        this.user.data.cart = await postAddCart.bind(this.api)(id)
        this.user.setData({ ...this.user.data })
      } else {
        window.location.replace('/login')
      }
    }
  }

  map(callback:(p:CartData)=>ReactNode):ReactNode{
    return this.user.data?.cart?.map(callback)
  }

  get isNotEmpty(){
    return this.user.data?.cart?.length||0>0
  }

  get isEmpty(){
    return this.user.data?.cart !== undefined && this.user.data.cart.length < 1
  }

  removeCart(id:number) {
    return async () => {
      if (this.user.data !== undefined) {
        this.user.setData({ ...this.user.data })
        this.user.data.cart = await postRemoveCart.bind(this.api)(id)
        this.user.setData({ ...this.user.data })
      }
    }
  }

  get(id:number) {
    return this.user.data?.cart?.filter((c) => c.id === id)[0]
  }

  get totalItems() {
    return Cart.totalItems(this.user.data?.cart)
  }

  static totalItems(cart?:CartData[]) {
    if (cart === undefined || cart.length === 0) return 0
    if (cart.length === 1) return cart[0].quantity
    return cart.reduce<number>((c1, c2) => {
      return c1 + c2.quantity
    }, 0)
  }

  get totalPrice() {
    return Cart.totalPrice(this.user.data?.cart).toFixed(2)
  }

  static totalPrice(cart:CartData[]|undefined) {
    if (cart === undefined || cart.length === 0) return 0
    if (cart.length === 1) {
      return cart[0].quantity * cart[0].price
    }
    return cart.reduce<number>((c1, c2) => {
      return c1 + c2.quantity * c2.price
    }, 0)
  }
}
