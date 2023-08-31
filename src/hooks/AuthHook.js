import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const useAuth = (user) => {
  const navigate = useNavigate()

  useEffect(() => {
    if(!user.isLoggedIn) navigate('/login')
  }, [user.data])
}
