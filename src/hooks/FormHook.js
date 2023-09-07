import { useState } from 'react'
import { useForm as useHookForm } from 'react-hook-form'
import Input from '../util/form/input'

export const useForm = (postFunction, inputs) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useHookForm()
  for(const i of Object.keys(inputs)){
    if(i instanceof Input) i.register = register
  }
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
    return async (e) => {
      e.preventDefault()
      if (this.reportValidity(e.target)) {
        this.data.isLoading = true
        this.setData({ ...this.data })
        const data = new FormData(e.target)
        const object = Object.fromEntries(data)
        if (this.data.token) object.token = this.data.token
        const res = await this.postFunction(object)
        if (res.error && res.error.field) {
          this.data[res.error.field].error = res.error.message
          this.data.isLoading = false
          this.setData({
            ...this.data,
          })
        } else if (res.error) {
          this.data.error = res.error
          this.data.isLoading = false
          this.setData({ ...this.data })
        } else if (res.success) {
          this.data.success = res.success
          this.setData({
            ...this.data,
          })
          this.data.isLoading = false
          this.setData({ ...this.data })
          if (res.redirect) window.location.replace(`${res.redirect}`)
        } else {
          window.location.replace('/')
        }
      }
    }
  }

  reportValidity(form) {
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

  validate(input) {
    this.data[input.id].error = input.validationMessage
    if (this.data[input.id].validation) {
      this.data[input.id].error = this.data[input.id].validation()
    }
    this.setData({ ...this.data })
  }

  changeHandler() {
    return ({ target }) => {
      this.data[target.id].value = target.value
      this.validate(target)
    }
  }
}
