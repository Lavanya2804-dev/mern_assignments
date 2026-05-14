import React from 'react'
import {NavLink} from 'react-router'
export default function Header() {
  return (
    <div className="flex justify-between items-center px-10 bg-gray-400">
        <img 
        className="py-2 rounded-[50%]"
        width="80px" src="https://static.vecteezy.com/system/resources/previews/004/474/885/original/falcon-wing-logo-icon-template-free-vector.jpg"/>
        <nav>
            <ul className="flex gap-10 text-2xl">
                <li>
                    <NavLink to="/">Home</NavLink>
                </li>
                <li>
                    <NavLink to="register">Register</NavLink>
                </li>
                <li>
                    <NavLink to="login">Login</NavLink>
                </li>
                <li>
                    <NavLink to="technologies">Technologies</NavLink>
                </li>
            </ul>
        </nav>
    </div>
  )
}
