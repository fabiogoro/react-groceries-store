import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserContext } from '../contexts/UserContext'

export const useAdmin = () => {
  const user = useUserContext()
  const navigate = useNavigate()

  useEffect(() => {
    if(!user?.isLoggedIn) navigate('/login')
    else if(!user.isAdmin) navigate('/')
  }, [user?.isAdmin, user?.isLoggedIn, navigate])
}
