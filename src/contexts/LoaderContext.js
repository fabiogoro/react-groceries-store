import { createContext, useContext } from 'react'

const LoaderContext = createContext(null)

export const useLoaderContext = () => {
  return useContext(LoaderContext)
}

export function LoaderProvider({ children }) {
  return <LoaderContext.Provider value={{}}>{children}</LoaderContext.Provider>
}
