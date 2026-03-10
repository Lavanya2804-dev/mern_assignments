import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Outlet } from 'react-router'

export default function RootLayout() {
  return (
    <div>
        <Header/>
        <div className="mx-20 min-h-screen">
        <Outlet/>
        </div>
        <Footer/>
    </div>
  )
}
