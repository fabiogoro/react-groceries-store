import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { User } from './UserHook'

export const useAuth = (user:User|null) => {
  const navigate = useNavigate()

  useEffect(() => {
    if(!user?.isLoggedIn) navigate('/login')
  }, [user?.isLoggedIn, navigate])
}
