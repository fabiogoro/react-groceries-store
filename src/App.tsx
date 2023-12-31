import Header from './components/Header'
import Footer from './components/Footer'
import Groceries from './pages/Groceries'
import Products from './pages/Products'
import Product from './pages/Product'
import Grocery from './pages/Grocery'
import Order from './pages/Order'
import About from './pages/About'
import Contact from './pages/Contact'
import Cart from './pages/Cart'
import Login from './pages/Login'
import Orders from './pages/Orders'
import MyOrders from './pages/MyOrders'
import Profile from './pages/Profile'
import Signup from './pages/Signup'
import Checkout from './pages/Checkout'
import ResetPassword from './pages/ResetPassword'
import NewPassword from './pages/NewPassword'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { UserProvider } from './contexts/UserContext'
import { ApiProvider } from './contexts/ApiContext'
import './styles/app.css'
import React from 'react'

function App() {
  const router = createBrowserRouter([
    { path: '/', element: <Groceries /> },
    { path: '/about', element: <About /> },
    { path: '/contact', element: <Contact /> },
    { path: '/signup', element: <Signup /> },
    { path: '/reset', element: <ResetPassword /> },
    { path: '/password', element: <NewPassword /> },
    { path: '/cart', element: <Cart /> },
    { path: '/checkout', element: <Checkout /> },
    { path: '/orders', element: <Orders /> },
    { path: '/myorders', element: <MyOrders /> },
    { path: '/profile', element: <Profile /> },
    { path: '/products', element: <Products /> },
    { path: '/product', element: <Product /> },
    { path: '/login', element: <Login /> },
    {
      path: '/grocery/:id',
      element: <Grocery />,
      loader: async ({ params }) => {
        return params.id
      },
    },
    {
      path: '/product/:id',
      element: <Product />,
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
        <UserProvider>
          <Header></Header>
          <RouterProvider router={router} />
          <Footer></Footer>
        </UserProvider>
      </ApiProvider>
    </div>
  )
}

export default App
