export async function fetchOrder({id}) {
  return await this.fetchBase(`order/${id}`)
}

export async function fetchOrders({ page, q }) {
  return await this.fetchBase(`orders?page=${page}&q=${q}`)
}

export async function fetchMyOrders({ page, q }) {
  return await this.fetchBase(`orders/my?page=${page}&q=${q}`)
}

export async function postCheckout(data) {
  return await this.fetchBase(`order`, 'POST', data)
}
