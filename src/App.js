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
import { useCart } from './hooks/CartHook'
import { useUser } from './hooks/UserHook'
import Modal from 'react-bootstrap/Modal'
import Spinner from 'react-bootstrap/Spinner'

function App() {
  const [user] = useUser()
  let [cart] = useCart(user)
  user.cart = cart

  const router = createBrowserRouter([
    { path: '/', element: <Groceries user={user} /> },
    { path: '/about', element: <About /> },
    { path: '/contact', element: <Contact /> },
    { path: '/signup', element: <Signup /> },
    { path: '/reset', element: <ResetPassword /> },
    { path: '/password', element: <NewPassword /> },
    { path: '/cart', element: <Cart user={user} /> },
    { path: '/login', element: <Login user={user} /> },
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
      <Header user={user}></Header>
      <RouterProvider router={router} />
      <Footer></Footer>
      <Modal
        show={cart.data.isLoading}
        centered
        contentClassName="bg-transparent border-0"
        className="d-flex"
      >
        <Spinner className=""></Spinner>
      </Modal>
    </div>
  )
}

export default App
