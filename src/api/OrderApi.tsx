export async function fetchOrder(this:any, {id}:{id?:number}) {
  return await this.fetchBase(`order/${id}`)
}

export async function fetchOrders(this:any, { page=1, q='' }:{page?:number, q?:string}) {
  return await this.fetchBase(`orders?page=${page}&q=${q}`)
}

export async function fetchMyOrders(this:any, { page=1, q='' }:{page?:number, q?:string}) {
  return await this.fetchBase(`orders/my?page=${page}&q=${q}`)
}

export async function postCheckout(this:any, data:{}) {
  return await this.fetchBase(`order`, 'POST', data)
}
