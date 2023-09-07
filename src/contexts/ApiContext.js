import { createContext, useContext } from 'react'
import { ApiHelper } from '../api/ApiHelper'

const ApiContext = createContext(null);

export const useApiContext = () => {
  return useContext(ApiContext);
};

export function ApiProvider({children}){
  const apiHelper = new ApiHelper()
  return (
    <ApiContext.Provider
      value={apiHelper}
    >
      {children}
    </ApiContext.Provider>

  )
}
