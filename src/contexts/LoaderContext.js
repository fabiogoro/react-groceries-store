import { createContext, useContext, useState } from 'react'
import { useUser } from '../hooks/UserHook'
import Modal from 'react-bootstrap/Modal'
import Spinner from 'react-bootstrap/Spinner'

const LoaderContext = createContext(null);

export const useLoaderContext = () => {
  return useContext(LoaderContext);
};

export function LoaderProvider({children}){
  const [isLoading, setIsLoading] = useState(false)
  return (
    <LoaderContext.Provider
      value={{
        isLoading, setIsLoading
      }}
    >
      {children}
      <Modal
        show={isLoading}
        centered
        contentClassName="bg-transparent border-0"
        className="d-flex"
      >
        <Spinner className=""></Spinner>
      </Modal>
    </LoaderContext.Provider>

  )
}
