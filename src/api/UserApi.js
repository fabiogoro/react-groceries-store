export async function fetchUser() {
  return await this.fetchBase(`user`)
}

export async function postLogin(data) {
  return await this.fetchBase(`login`, 'POST', data)
}

export async function postLogoff() {
  return await this.fetchBase(`logoff`, 'POST')
}

export async function postResetPassword(data) {
  return await this.fetchBase(`reset`, 'POST', data)
}

export async function postNewPassword(data) {
  return await this.fetchBase(`reset/password`, 'POST', data)
}

export async function postSignUp(data) {
  return await this.fetchBase(`user`, 'POST', data)
}

export async function postProfile(data) {
  return await this.fetchBase(`profile`, 'POST', data)
}

export async function deleteAddress(id) {
  return await this.fetchBase(`address/${id}`, 'DELETE')
}
