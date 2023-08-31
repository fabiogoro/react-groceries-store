import { useState } from 'react'

export const useForm = (postFunction, inputs) => {
  const form = new Form(useState(inputs), postFunction)

  return [form]
}

class Form {
  constructor([data, setData], postFunction) {
    this.data = data
    this.setData = setData
    this.postFunction = postFunction
  }

  formSubmit() {
    return async (e)=>{
      e.preventDefault()
      if(this.reportValidity(e.target)){
        const data = new FormData(e.target)
        const object = Object.fromEntries(data)
        if(this.data.token) object.token = this.data.token
        const res = await this.postFunction(object)
        if(res.error && res.error.field){
          this.data[res.error.field].error = res.error.message
          this.setData({
            ...this.data,
          })
        } else if(res.error){
          this.data.error = res.error
          this.setData({
            ...this.data,
          })
        } else if(res.success) {
          this.data.success = res.success
          this.setData({
            ...this.data,
          })
          if(res.redirect) window.location.replace(res.redirect)
        } else {
          window.location.replace('/')
        }
      }
    }
  }

  reportValidity(form){
    for(const input of form.elements){
      if(this.data[input.id]){
        this.validate(input)
        if(this.data[input.id].error){
          return false
        }
      }
    }
    return true
  }

  validate(input){
    this.data[input.id].error = input.validationMessage
    if (this.data[input.id].validation) {
      this.data[input.id].error = this.data[input.id].validation()
    }
    this.setData({ ...this.data })
  }

  changeHandler() {
    return ({ target })=>{
      this.data[target.id].value = target.value
      this.validate(target)
    }
  }
}
