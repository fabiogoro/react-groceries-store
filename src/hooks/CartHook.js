import { useState, useEffect } from 'react'
import { postAddCart, postRemoveCart, fetchCart } from '../util/Api'

export const useCart = (user) => {
  const cart = new Cart(useState({cart: [], isLoading: false}), user)

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
    this.setData({...this.data, cart: await fetchCart()})
  }

  addCart(id) {
    return async () => {
      if (this.user.name) {
        this.data.isLoading = true
        this.setData({ ...this.data })
        this.data.cart = await postAddCart(id)
        this.data.isLoading = false
        this.setData({ ...this.data })
      } else {
        window.location.replace('/login')
      }
    }
  }

  removeCart(id) {
    return async () => {
      this.data.isLoading = true
      this.setData({ ...this.data })
      this.data.cart = await postRemoveCart(id)
      this.data.isLoading = false
      this.setData({ ...this.data })
    }
  }

  get(id) {
    return this.data.cart?.filter((c) => c.id === id)[0]
  }

  get totalItems() {
    if (this.data.cart.length === 0) return 0
    if (this.data.cart.length === 1) return this.data.cart[0].quantity
    return this.data.cart.reduce((c1, c2) => {
      return typeof c1 != 'number'
        ? c1.quantity + c2.quantity
        : c1 + c2.quantity
    })
  }

  get totalPrice() {
    if (this.data.cart.length === 0) return 0
    if (this.data.cart.length === 1) {
      return this.data.cart[0].quantity * this.data.cart[0].price
    }
    return this.data.cart.reduce((c1, c2) => {
      return typeof c1 != 'number'
        ? c1.quantity * c1.price + c2.quantity * c2.price
        : c1 + c2.quantity * c2.price
    })
  }
}
