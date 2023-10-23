export async function fetchUser(this:any) {
  return await this.fetchBase(`user`)
}

export async function postLogin(this:any, data:{}) {
  return await this.fetchBase(`login`, 'POST', data)
}

export async function postLogoff(this:any, ) {
  return await this.fetchBase(`logoff`, 'POST')
}

export async function postResetPassword(this:any, data:{}) {
  return await this.fetchBase(`reset`, 'POST', data)
}

export async function postNewPassword(this:any, data:{}) {
  return await this.fetchBase(`reset/password`, 'POST', data)
}

export async function postSignUp(this:any, data:{}) {
  return await this.fetchBase(`user`, 'POST', data)
}

export async function postProfile(this:any, data:{}) {
  return await this.fetchBase(`profile`, 'POST', data)
}

export async function deleteAddress(this:any, id:{}) {
  return await this.fetchBase(`address/${id}`, 'DELETE')
}
