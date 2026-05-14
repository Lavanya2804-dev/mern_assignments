import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../store/authStore";
import {
  navbarClass,
  navContainerClass,
  navBrandClass,
  navLinksClass,
  navLinkClass,
  navLinkActiveClass,
} from "../styles/common.js";

function Header() {
  const isAuthenticated = useAuth((state) => state.isAuthenticated);
  const user = useAuth((state) => state.currentUser);
  const logout = useAuth((state) => state.logout);

  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const getProfilePath = () => {
    if (!user) return "/";

    switch (user.role) {
      case "AUTHOR":
        return "/author-profile";
      case "ADMIN":
        return "/admin-profile";
      default:
        return "/user-profile";
    }
  };

  return (
    <header className="shadow-sm sticky-top bg-white">
      <nav className={navbarClass}>
        <div className={navContainerClass}>

          {/* Logo */}
          <NavLink to="/" className={`${navBrandClass} fw-bold fs-3 text-primary`}>
            MyBlog
          </NavLink>

          {/* Nav Links */}
          <ul className={`${navLinksClass} d-flex align-items-center gap-3`}>

            <li>
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  isActive ? navLinkActiveClass : navLinkClass
                }
              >
                Home
              </NavLink>
            </li>

            {!isAuthenticated && (
              <>
                <li>
                  <NavLink
                    to="/register"
                    className={({ isActive }) =>
                      isActive ? navLinkActiveClass : navLinkClass
                    }
                  >
                    Register
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/login"
                    className="btn btn-primary px-4 rounded-pill"
                  >
                    Login
                  </NavLink>
                </li>
              </>
            )}

            {isAuthenticated && (
  <>
    <li>
      <NavLink
        to={getProfilePath()}
        className={({ isActive }) =>
          isActive ? navLinkActiveClass : navLinkClass
        }
      >
        Profile
      </NavLink>
    </li>

    <li className="flex items-center gap-3">

      <div className="w-9 h-9 rounded-full overflow-hidden border border-[#d2d2d7]">
        <img
          src={
            user?.profilePic ||
            "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          }
          alt="profile"
          className="w-full h-full object-cover"
        />
      </div>

      <button
        className="bg-[#0066cc] text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-[#004499] transition-colors"
        onClick={handleLogout}
      >
        Logout
      </button>
    </li>
  </>
)}
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;