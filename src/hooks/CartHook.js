import { postAddCart, postRemoveCart } from '../api/CartApi'

export class Cart {
  constructor(user, api) {
    this.user = user
    this.api = api
  }

  addCart(id) {
    return async () => {
      if (this.user.name) {
        this.user.data.cart = await postAddCart.bind(this.api)(id)
        this.user.setData({ ...this.user.data })
      } else {
        window.location.replace('/login')
      }
    }
  }

  map(callback){
    return this.user.data?.cart?.map(callback)
  }

  get isNotEmpty(){
    return this.user.data?.cart?.length>0
  }

  get isEmpty(){
    return this.user.data?.cart !== undefined && this.user.data.cart.length < 1
  }

  removeCart(id) {
    return async () => {
      this.user.setData({ ...this.user.data })
      this.user.data.cart = await postRemoveCart.bind(this.api)(id)
      this.user.setData({ ...this.user.data })
    }
  }

  get(id) {
    return this.user.data?.cart?.filter((c) => c.id === id)[0]
  }

  get totalItems() {
    if (this.user.data?.cart === undefined) return 0
    if (this.user.data?.cart.length === 0) return 0
    if (this.user.data?.cart.length === 1) return this.user.data?.cart[0].quantity
    return this.user.data?.cart.reduce((c1, c2) => {
      return typeof c1 != 'number'
        ? c1.quantity + c2.quantity
        : c1 + c2.quantity
    })
  }

  get totalPrice() {
    if (this.user.data?.cart === undefined) return 0
    if (this.user.data?.cart.length === 0) return 0
    if (this.user.data?.cart.length === 1) {
      return this.user.data?.cart[0].quantity * this.user.data?.cart[0].price
    }
    return this.user.data?.cart.reduce((c1, c2) => {
      return typeof c1 != 'number'
        ? c1.quantity * c1.price + c2.quantity * c2.price
        : c1 + c2.quantity * c2.price
    })
  }
}
