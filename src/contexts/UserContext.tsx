import { ReactNode, createContext, useContext } from 'react'
import { useUser, User } from '../hooks/UserHook'

const UserContext = createContext<User | null>(null);

export const useUserContext = ():User | null => {
  return useContext<User | null>(UserContext);
};

export function UserProvider({children}:{children:ReactNode}){
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
