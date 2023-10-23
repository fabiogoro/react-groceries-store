export async function fetchCart(this: any) {
  return await this.fetchBase(`cart`)
}

export async function postRemoveCart(this: any, id:number) {
  return await this.fetchBase(`cart/remove/${id}`, 'POST')
}

export async function postAddCart(this: any, id:number) {
  return await this.fetchBase(`cart/add/${id}`, 'POST')
}
