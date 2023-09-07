import Header from './components/Header'
import Footer from './components/Footer'
import Groceries from './routes/Groceries'
import Grocery from './routes/Grocery'
import Order from './routes/Order'
import About from './routes/About'
import Contact from './routes/Contact'
import Cart from './routes/Cart'
import Login from './routes/Login'
import Signup from './routes/Signup'
import Checkout from './routes/Checkout'
import ResetPassword from './routes/ResetPassword'
import NewPassword from './routes/NewPassword'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { UserProvider } from './contexts/UserContext'
import { LoaderProvider } from './contexts/LoaderContext'
import { ApiProvider } from './contexts/ApiContext'
import './styles/app.css'

function App() {
  const router = createBrowserRouter([
    { path: '/', element: <Groceries/> },
    { path: '/about', element: <About /> },
    { path: '/contact', element: <Contact /> },
    { path: '/signup', element: <Signup /> },
    { path: '/reset', element: <ResetPassword /> },
    { path: '/password', element: <NewPassword /> },
    { path: '/cart', element: <Cart/> },
    { path: '/checkout', element: <Checkout/> },
    { path: '/login', element: <Login/> },
    {
      path: '/grocery/:id',
      element: <Grocery />,
      loader: async ({ params }) => {
        return params.id
      },
    },
    {
      path: '/order/:id',
      element: <Order />,
      loader: async ({ params }) => {
        return params.id
      },
    },
  ])

  return (
    <div>
      <ApiProvider>
        <LoaderProvider>
          <UserProvider>
            <Header></Header>
            <RouterProvider router={router} />
            <Footer></Footer>
          </UserProvider>
        </LoaderProvider>
      </ApiProvider>
    </div>
  )
}

export default App
