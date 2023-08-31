import { useState, useEffect } from 'react'
import { postAddCart, postRemoveCart, fetchCart } from '../util/Api'

export const useCart = (user) => {
  const cart = new Cart(useState([]), user)

  useEffect(() => {
    cart.loadCart()
  }, [user.data])

  return [cart]
}

class Cart {
  constructor([data, setData], user) {
    this.data = data
    this.setData = setData
    this.user = user
  }

  async loadCart() {
    this.setData(await fetchCart())
  }

  addCart(id) {
    return async () => {
      if (this.user.name) {
        this.setData(await postAddCart(id))
      } else {
        window.location.replace('/login')
      }
    }
  }

  removeCart(id) {
    return async () => this.setData(await postRemoveCart(id))
  }

  get(id) {
    return this.data?.filter((c) => c.id === id)[0]
  }

  get totalItems() {
    if (this.data.length === 0) return 0
    if (this.data.length === 1) return this.data[0].quantity
    return this.data.reduce((c1, c2) => {
      return typeof c1 != 'number'
        ? c1.quantity + c2.quantity
        : c1 + c2.quantity
    })
  }

  get totalPrice() {
    if (this.data.length === 0) return 0
    if (this.data.length === 1) {
      return this.data[0].quantity * this.data[0].price
    }
    return this.data.reduce((c1, c2) => {
      return typeof c1 != 'number'
        ? c1.quantity * c1.price + c2.quantity * c2.price
        : c1 + c2.quantity * c2.price
    })
  }
}
