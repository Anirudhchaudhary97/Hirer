import React from 'react'
import Navbar from './components/shared/Navbar'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Home from './components/Home'
import Jobs from './components/Jobs'

 const router= createBrowserRouter([
           {
            path:'/',
            element:<Home/>
           },
           {
            path:'/login',
            element:<Login/>
           },
           {
            path:'/signup',
            element:<Signup/>
           },
           {
            path:'/jobs',
            element:<Jobs/>
           }

  ])


const App = () => {
  return (
    <>
     <RouterProvider router={router}
      
     />
     
    </>
  )
}

export default App
