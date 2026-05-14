import React from 'react'
import { NavLink } from 'react-router'
import { Outlet } from 'react-router'

export default function Technologies() {
  return (
    <div className="mt-10">
        <ul className="flex justify-around text-2xl">
            <li>
                <NavLink to="java">Java</NavLink>
            </li>
            <li>
                <NavLink to="nodejs">Nodejs</NavLink>
            </li>
            <li>
                <NavLink to="vue">Vue</NavLink>
            </li>
        </ul>

        {/* placeholder for children of technologies*/ }
        <Outlet/>
    </div>
  )
}
