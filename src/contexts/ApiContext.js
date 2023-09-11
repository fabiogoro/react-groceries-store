import { createContext, useContext, useState } from 'react'
import { ApiHelper } from '../api/ApiHelper'
import Modal from 'react-bootstrap/Modal'
import Spinner from 'react-bootstrap/Spinner'

const ApiContext = createContext(null);

export const useApiContext = () => {
  return useContext(ApiContext);
};

export function ApiProvider({children}){
  const [isLoading, setIsLoading] = useState(false)
  const apiHelper = new ApiHelper(setIsLoading)
  return (
    <ApiContext.Provider
      value={apiHelper}
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
    </ApiContext.Provider>

  )
}
