import Header from './Header'
import Footer from './Footer'
import Groceries from './Groceries'
import Grocery from './Grocery'
import About from './About'
import Contact from './Contact'
import Login from './Login'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { fetchUser } from './util/Api'

function App() {
  const [user, setUser] = useState(undefined)

  async function loadUser(){
    if(document.cookie.match('AuthToken')){
      const user = await fetchUser()
      setUser(user)
    }
  }

  useEffect(() => {
    loadUser()
  }, []);

  const router = createBrowserRouter([
    { path: "/", element: <Groceries/> },
    { path: "/about", element: <About/> },
    { path: "/contact", element: <Contact/> },
    { path: "/login", element: <Login setUser={setUser}/> },
    { path: "/groceries", element: <Groceries/> },
    { path: "/groceries/:id", 
      element: <Grocery/>,
      loader: async ({ params }) => {
        return params.id
      },
    },
  ]);

  return (
    <div>
      <Header user={user}></Header>
      <RouterProvider router={router}/>
      <Footer></Footer>
    </div>
  );
}

export default App;
