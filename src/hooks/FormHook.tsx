import { ChangeEvent, FormEvent, useState } from 'react'
import { Inputs } from '../util/form/input'

interface PostFunctionParams {
  [k: string]: FormDataEntryValue;
}

export const useForm = (postFunction:(params:PostFunctionParams)=>Inputs|Promise<any>, inputs:Inputs) => {
  const [data, setData] = useState<Inputs>(inputs)
  const form = new Form(data, setData, postFunction)

  return [form]
}

export class Form {
  constructor(public data:Inputs, public setData:(data:Inputs)=>void, public postFunction:(params:PostFunctionParams)=>Inputs|Promise<any>) {
  }

  formSubmit() {
    return async (e:FormEvent) => {
      e.preventDefault()
      if (this.reportValidity(e.target as HTMLFormElement)) {
        const data = new FormData(e.target as HTMLFormElement)
        const object = Object.fromEntries(data)
        if (this.data.token) object.token = this.data.token
        const res = await this.postFunction(object)
        if (res.error!==undefined && typeof(res.error)!=='string' && res.error.field) {
          this.data[res.error.field].error = res.error.message
          this.setData({
            ...this.data,
          })
        } else if (res.error!==undefined) {
          this.data.error = res.error
          this.setData({ ...this.data })
        } else if (res.success) {
          this.data.success = res.success
          window.scrollTo({ top: 0, behavior: 'smooth' });
          this.setData({ ...this.data })
          if (res.redirect) window.location.replace(`${res.redirect}`)
        } else {
          window.location.replace('/')
        }
      }
    }
  }

  reportValidity(form:HTMLFormElement) {
    for (const input of form.elements) {
      if (this.data[input.id]) {
        this.validate(input)
        if (this.data[input.id].error) {
          return false
        }
      }
    }
    return true
  }

  validate(input:HTMLInputElement|Element) {
    if(input instanceof HTMLInputElement) this.data[input.id].error = input.validationMessage
    if (!this.data[input.id].error && this.data[input.id].validation) {
      this.data[input.id].error = this.data[input.id].validation()
    }
    this.setData({ ...this.data })
  }

  changeHandler() {
    return ({ target }:ChangeEvent) => {
      this.data[target.id].value = (target as HTMLInputElement).value
      this.validate(target)
    }
  }
}
