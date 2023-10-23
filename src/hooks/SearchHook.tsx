import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Item } from '../pages/Groceries'

export interface SearchData {
  page:number,sort_by:string,categories:string,q:string,items?:Item[],pages?:number
}

export const useSearch = (fetchFunction:(data:SearchData)=>Promise<{results:Item[],pages:number}>) => {
  const [searchParams, ] = useSearchParams()
  const q = searchParams.get('q') || ''
  const sort_by = searchParams.get('sort_by') || 'title.asc'
  const categories = searchParams.get('categories') || ''

  const [data, setData] = useState<SearchData>({
    page: 1,
    sort_by: sort_by,
    categories: categories,
    q: q,
  })
  const search = new Search(data, setData, fetchFunction)

  useEffect(() => {
    if(search.data.items===undefined){
      search.newSearch()
    }
  })


  useEffect(() => {
    window.addEventListener('scroll', search.handleScroll.bind(search))
    return () => window.removeEventListener('scroll', search.handleScroll.bind(search))
  })

  return [search]
}

class Search {
  constructor(
    public data: SearchData,
    public setData: (data: SearchData) => void,
    public fetchFunction: (data: SearchData) => Promise<{results:Item[],pages:number}>,
    public isLoading = true
  ) {
  }

  changeSorting({ target: { value } }: { target: HTMLSelectElement }) {
    const params = new URLSearchParams(document.location.search)
    params.set('sort_by', value)
    document.location.replace(`/?${params}`)
  }

  changeFilters({ target }: { target: HTMLInputElement }) {
    const params = new URLSearchParams(document.location.search)
    if (!target.checked) {
      params.delete('categories')
      params.delete('children')
    } else {
      params.set('categories', target.value)
      params.set('children', target.getAttribute('data-childselector')||'')
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
      if(this.data.items) this.data.items = [...this.data.items, ...results.results]
      this.setData({ ...this.data })
    } finally {
      this.isLoading = false
    }
  }

  handleScroll() {
    if (
      window.innerHeight + document.documentElement.scrollTop <
      document.documentElement.offsetHeight - 10 ||
      this.isLoading || this.data.page >= (this.data.pages||0)
    ) {
      return
    }
    this.addSearchPage()
  }

  get items() {
    return this.data.items
  }
}
