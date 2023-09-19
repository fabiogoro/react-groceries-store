import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

export const useSearch = (fetchFunction) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const q = searchParams.get('q') || ''
  const sort_by = searchParams.get('sort_by') || 'title.asc'
  const categories = searchParams.get('categories') || ''

  const search = new Search(useState({
    items: [],
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
  })

  return [search]
}

class Search {
  constructor([data, setData], fetchFunction) {
    this.data = data
    this.setData = setData
    this.fetchFunction = fetchFunction
    this.isLoading = true
  }

  changeSorting({target: {value}}){
    const params = new URLSearchParams(document.location.search)
    params.set('sort_by', value)
    document.location.replace(`/?${params}`)
  }

  changeFilters(e) {
    const params = new URLSearchParams(document.location.search)
    if(!e.target.checked){
      params.delete('categories')
      params.delete('children')
    } else {
      params.set('categories', e.target.value)
      params.set('children', e.target.getAttribute('childselector'))
    }
    document.location.replace(`/?${params}`)
  }

  async newSearch() {
    try {
      const results = await this.fetchFunction(this.data)
      this.data.items = results.results
      this.data.pages = results.pages
      this.setData({ ...this.data })
    } finally {
      this.isLoading = false
    }
  }

  async addSearchPage() {
    try {
      this.isLoading = true
      this.data.page++
      const results = await this.fetchFunction(this.data)
      this.data.items = [...this.data.items, ...results.results]
      this.setData({ ...this.data })
    } finally {
      this.isLoading = false
    }
  }

  handleScroll() {
    if (
      window.innerHeight + document.documentElement.scrollTop <
      document.documentElement.offsetHeight - 10 ||
      this.isLoading || this.data.page >= this.data.pages
    ) {
      return
    }
    this.addSearchPage()
  }

  get items(){
    return this.data.items
  }
}
