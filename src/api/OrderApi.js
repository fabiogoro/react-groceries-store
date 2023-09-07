  export async function fetchOrder({id}) {
    return await this.fetchBase(`order/${id}`)
  }

  export async function postCheckout(data) {
    return await this.fetchBase(`order`, 'POST', data)
  }
