import { createContext, useContext, useState } from 'react'
import { useUser } from '../hooks/UserHook'
import Modal from 'react-bootstrap/Modal'
import Spinner from 'react-bootstrap/Spinner'

const LoaderContext = createContext(null);

export const useLoaderContext = () => {
  return useContext(LoaderContext);
};

export function LoaderProvider({children}){
  return (
    <LoaderContext.Provider
      value={{
      }}
    >
      {children}
    </LoaderContext.Provider>

  )
}
