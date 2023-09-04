import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

export const useSearch = (fetchFunction) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const q = searchParams.get('q') || ''
  const sort_by = searchParams.get('sort_by') || 'title.asc'
  const categories = searchParams.get('categories') || ''

  const search = new Search(useState({
    items: [],
    isLoading: false,
    page: 1,
    sort_by: sort_by,
    categories: categories,
    q: q
  }), fetchFunction)

  useEffect(() => {
    search.newSearch()
  }, [])


  useEffect(() => {
    window.addEventListener('scroll', search.handleScroll.bind(search))
    return () => window.removeEventListener('scroll', search.handleScroll.bind(search))
  }, [search.isLoading])

  return [search]
}

class Search {
  constructor([data, setData], fetchFunction) {
    this.data = data
    this.setData = setData
    this.fetchFunction = fetchFunction
  }

  changeSorting({target: {value}}){
    const params = new URLSearchParams(document.location.search)
    params.set('sort_by', value)
    document.location.replace(`/?${params}`)
  }

  changeFilters(e) {
    const params = new URLSearchParams(document.location.search)
    const categories = params.get('categories')?.split(',') || []
    const index = categories.indexOf(e.target.value)
    if(index>-1){
      categories.splice(index, 1)
    } else {
      categories.push(e.target.value)
    }
    if(categories.length) params.set('categories', categories.join(','))
    else params.delete('categories')
    document.location.replace(`/?${params}`)
  }

  async newSearch() {
    this.data.isLoading = true
    this.setData({ ...this.data })
    try {
      const results = await this.fetchFunction(this.data)
      this.data.items = results
      this.setData({ ...this.data })
    } finally {
      this.data.isLoading = false
      this.setData({ ...this.data })
    }
  }

  async addSearchPage() {
    this.data.isLoading = true
    this.setData({ ...this.data })
    try {
      this.data.page++
      const results = await this.fetchFunction(this.data)
      this.data.items = [...this.data.items, ...results]
      this.setData({ ...this.data })
    } finally {
      this.data.isLoading = false
      this.setData({ ...this.data })
    }
  }

  handleScroll() {
    if (
      window.innerHeight + document.documentElement.scrollTop <
      document.documentElement.offsetHeight - 10 ||
      this.isLoading
    ) {
      return
    }
    this.addSearchPage()
  }

  get items(){
    return this.data.items
  }

  get isLoading(){
    return this.data.isLoading
  }
}
