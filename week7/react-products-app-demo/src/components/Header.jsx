import React from 'react'
import { NavLink } from 'react-router'

export default function Header() {
  return (
    <div className="flex justify-between px-10 items-center bg-gray-300">
        <img width="80px" className="p-2"  src="https://tse4.mm.bing.net/th/id/OIP.TKqXFGzx4pR6HRN1fXt8hwHaHa?rs=1&pid=ImgDetMain&o=7&rm=3" 
        alt=""/>

        <ul className="flex gap-10 text-2xl">
            <li>
                <NavLink to="" className={({isActive})=>isActive?"text-blue-100 bg-blue-500 p-2":""}>Home</NavLink>
            </li>
            <li>
                <NavLink to="products" className={({isActive})=>isActive?"text-blue-100 bg-blue-500 p-2":""}>ProductsList</NavLink>
            </li>
            <li>
                <NavLink to="product" className={({isActive})=>isActive?"text-blue-100 bg-blue-500 p-2":""}>Product</NavLink>
            </li>
            <li>
                <NavLink to="contact" className={({isActive})=>isActive?"text-blue-100 bg-blue-500 p-2":""}>ContactUs</NavLink>
            </li>

        </ul>
    </div>
  )
}
