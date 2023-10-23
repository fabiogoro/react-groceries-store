const base = process.env.REACT_APP_BACKEND_URL

export class ApiHelper {
  constructor(public setIsLoading:(isLoading:boolean)=>void) {
  }

  async fetchBase(url:string, method?:string, data?:{}) {
    this.setIsLoading(true)
    const config:RequestInit = {
      method: method || 'GET',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      }
    }
    if (data && method!=='GET') config.body = JSON.stringify(data)
    const responseJson = await fetch(`${base}${url}`, config)
    const response = await responseJson.json()
    this.setIsLoading(false)
    return response
  }
}
