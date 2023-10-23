import { ReactNode, createContext, useContext } from 'react'

const LoaderContext = createContext<{}>({})

export const useLoaderContext = () => {
  return useContext(LoaderContext)
}

export function LoaderProvider({ children }:{children:ReactNode}) {
  return <LoaderContext.Provider value={{}}>{children}</LoaderContext.Provider>
}
