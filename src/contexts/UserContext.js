import { createContext, useContext } from 'react'
import { useUser } from '../hooks/UserHook'

const UserContext = createContext(null);

export const useUserContext = () => {
  return useContext(UserContext);
};

export function UserProvider({children}){
  const [user] = useUser()
  return (
    <UserContext.Provider
      value={
        user
      }
    >
      {children}
    </UserContext.Provider>

  )
}
