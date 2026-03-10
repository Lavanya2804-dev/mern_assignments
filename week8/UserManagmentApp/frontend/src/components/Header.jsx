import { NavLink } from "react-router";

function Header() {
  return (
    <nav className="flex justify-between px-10 items-center bg-amber-200 py-10">
      <img className="rounded-full" width="80px" src="https://thumbs.dreamstime.com/z/diverse-men-women-portrait-group-happy-people-different-age-generation-race-multiracial-crowd-diversity-society-concept-276441373.jpg" alt="" />
      <ul className="flex gap-6 text-2xl">
        <li>
          <NavLink to="" className={({ isActive }) => (isActive ? "bg-orange-500 text-blue-50 rounded-xl p-2 shadow" : "")}>
            Home
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/add-user"
            className={({ isActive }) => (isActive ? "bg-orange-500 text-blue-50 rounded-2xl p-2" : "")}
          >
            AddUser
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/users-list"
            className={({ isActive }) => (isActive ? "bg-orange-500 text-blue-50 rounded-2xl p-2 " : "")}
          >
            UsersList
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Header;