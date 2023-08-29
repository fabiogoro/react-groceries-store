import Header from './components/Header'
import Footer from './components/Footer'
import Groceries from './routes/Groceries'
import Grocery from './routes/Grocery'
import About from './routes/About'
import Contact from './routes/Contact'
import Cart from './routes/Cart'
import Login from './routes/Login'
import Signup from './routes/Signup'
import ResetPassword from './routes/ResetPassword'
import NewPassword from './routes/NewPassword'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { fetchUser } from './util/Api'

function App() {
  const [user, setUser] = useState(undefined)

  async function loadUser() {
    const user = await fetchUser()
    if (user.name) {
      setUser(user)
    }
  }

  useEffect(() => {
    loadUser()
  }, [])

  const router = createBrowserRouter([
    { path: '/', element: <Groceries /> },
    { path: '/about', element: <About /> },
    { path: '/contact', element: <Contact /> },
    { path: '/signup', element: <Signup /> },
    { path: '/reset', element: <ResetPassword /> },
    { path: '/password', element: <NewPassword /> },
    { path: '/cart', element: <Cart /> },
    { path: '/login', element: <Login setUser={setUser} /> },
    { path: '/groceries', element: <Groceries /> },
    {
      path: '/grocery/:id',
      element: <Grocery />,
      loader: async ({ params }) => {
        return params.id
      },
    },
  ])

  return (
    <div>
      <Header user={user} setUser={setUser}></Header>
      <RouterProvider router={router} />
      <Footer></Footer>
    </div>
  )
}

export default App
