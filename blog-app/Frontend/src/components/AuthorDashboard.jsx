import { NavLink, Outlet } from "react-router-dom";

import {
  pageWrapper,
  navLinkClass,
  navLinkActiveClass,
  divider,
} from "../styles/common.js";

import { useAuth } from "../store/authStore";

function AuthorDashboard() {

  const user = useAuth((state) => state.currentUser);

  return (
    <section className={pageWrapper}>

      {/* Profile Header */}
      <div className="bg-[#f5f5f7] border border-[#e8e8ed] rounded-[32px] p-8 md:p-10 mb-10">

        <div className="flex flex-col md:flex-row md:items-center gap-6">

          {/* Profile Image */}
          <div className="w-24 h-24 rounded-full overflow-hidden border border-[#d2d2d7]">

            <img
              src={
                user?.profileImageUrl ||
                `https://ui-avatars.com/api/?name=${user?.firstName || "Author"}`
              }
              alt="profile"
              className="w-full h-full object-cover"
            />

          </div>

          {/* User Info */}
          <div className="flex-1">

            <h1 className="text-3xl font-bold tracking-tight text-[#1d1d1f] mb-2">
              Welcome, {user?.firstName || "Author"} 👋
            </h1>

            <p className="text-[#6e6e73] text-sm mb-4">
              {user?.email}
            </p>

            <div className="flex items-center gap-3 flex-wrap">

              <span className="bg-white border border-[#d2d2d7] px-4 py-1.5 rounded-full text-sm text-[#1d1d1f]">
                Author
              </span>

              <span className="text-sm text-[#6e6e73]">
                Manage your articles and publish new stories
              </span>

            </div>

          </div>

        </div>

      </div>

      {/* Navigation */}
      <div className="flex gap-6 mb-8 border-b border-[#e8e8ed] pb-4">

        <NavLink
          to="articles"
          className={({ isActive }) =>
            isActive
              ? `${navLinkActiveClass} text-base`
              : `${navLinkClass} text-base`
          }
        >
          Articles
        </NavLink>

        <NavLink
          to="write-article"
          className={({ isActive }) =>
            isActive
              ? `${navLinkActiveClass} text-base`
              : `${navLinkClass} text-base`
          }
        >
          Write Article
        </NavLink>

      </div>

      <div className={divider}></div>

      {/* Nested Routes */}
      <Outlet />

    </section>
  );
}

export default AuthorDashboard;