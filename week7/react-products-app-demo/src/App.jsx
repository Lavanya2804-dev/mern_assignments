import React from 'react'
import { createBrowserRouter, RouterProvider , Navigate } from 'react-router'
import RootLayout from './components/RootLayout'
import Home from './components/Home'
import ProductsList from './components/ProductsList'
import ContactUs from './components/ContactUs'
import Product from './components/Product'

export default function App() {
  const routerObj=createBrowserRouter([
    {
    path:"/",
    element:<RootLayout/>,
    children:[
      {
      path:"",
      element:<Home/>
      },
      {
      path:"products",
      element:<ProductsList/>
      },
      {
      path:"contact",
      element:<ContactUs/>
      },
      {
      path:"product",
      element:<Product/>
      },
    ]
    }

  ])
  return <RouterProvider router={routerObj}/>
}
