export async function fetchCart() {
  return await this.fetchBase(`cart`)
}

export async function postRemoveCart(id) {
  return await this.fetchBase(`cart/remove/${id}`, 'POST')
}

export async function postAddCart(id) {
  return await this.fetchBase(`cart/add/${id}`, 'POST')
}
