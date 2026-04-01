import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  pageWrapper,
  navLinkClass,
  navLinkActiveClass,
  divider,
} from "../styles/common.js";

import { useAuth } from "../store/authStore";
import { toast } from "react-hot-toast";

function AuthorDashboard() {
  const navigate = useNavigate();

  // ✅ Get user + logout from store
  const user = useAuth((state) => state.currentUser);
  const logout = useAuth((state) => state.logout);

  // ✅ Logout handler
  const onLogout = async () => {
    await logout();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <div className={pageWrapper}>

      {/* ✅ HEADER (NEW) */}
      <div className="flex justify-between items-center mb-6 mt-3">

        {/* Welcome */}
        <h2 className="text-xl font-semibold text-gray-800">
          Welcome, {user?.firstName || "Author"} 👋
        </h2>

        {/* Profile + Logout */}
        <div className="flex items-center gap-4">

          {/* Profile Image */}
          <img
            src={
              user?.profileImageUrl ||
              `https://ui-avatars.com/api/?name=${user?.firstName || "Author"}`
            }
            alt="profile"
            className="w-10 h-10 rounded-full object-cover border"
          />

          {/* Logout Button */}
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={onLogout}
          >
            Logout
          </button>
        </div>
      </div>

      {/* ✅ Author Navigation */}
      <div className="flex gap-6 mb-6">

        <NavLink
          to="articles"
          className={({ isActive }) =>
            isActive ? navLinkActiveClass : navLinkClass
          }
        >
          Articles
        </NavLink>

        <NavLink
          to="write-article"
          className={({ isActive }) =>
            isActive ? navLinkActiveClass : navLinkClass
          }
        >
          Write Article
        </NavLink>

      </div>

      <div className={divider}></div>

      {/* ✅ Nested route content */}
      <Outlet />

    </div>
  );
}

export default AuthorDashboard;