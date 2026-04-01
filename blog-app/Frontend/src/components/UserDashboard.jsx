import { useAuth } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useEffect, useState } from "react";

import {
  articleGrid,
  articleCardClass,
  articleTitle,
  articleBody,
  ghostBtn,
  loadingClass,
  errorClass,
  timestampClass,
} from "../styles/common.js";

function UserDashboard() {
  const logout = useAuth((state) => state.logout);

  // ✅ NEW: get user from store
  const user = useAuth((state) => state.currentUser);

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const getArticles = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          "http://localhost:4000/user-api/articles",
          { withCredentials: true }
        );

        setArticles(res.data?.payload || []);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to load articles");
      } finally {
        setLoading(false);
      }
    };

    getArticles();
  }, []);

  // convert UTC → IST
  const formatDateIST = (date) => {
    return new Date(date).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  const onLogout = async () => {
    await logout();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  const navigateToArticleByID = (articleObj) => {
    navigate(`/article/${articleObj._id}`, {
      state: articleObj,
    });
  };

  if (loading) {
    return <p className={loadingClass}>Loading articles...</p>;
  }

  return (
    <div>
      {error && <p className={errorClass}>{error}</p>}

      {/* ✅ UPDATED HEADER (Added welcome + profile image) */}
      <div className="flex justify-between items-center mb-6 mt-3">
        
        {/* Welcome */}
        <h2 className="text-xl font-semibold text-gray-800">
          Welcome, {user?.firstName || "User"} 👋
        </h2>

        {/* Profile + Logout */}
        <div className="flex items-center gap-4">

          {/* Profile Image */}
         <img
  src={
    user?.profileImageUrl ||
    `https://ui-avatars.com/api/?name=${user?.firstName || "User"}`
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

      {/* Articles */}
      {articles.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">
          No articles available
        </p>
      ) : (
        <div className={articleGrid}>
          {articles.map((articleObj) => (
            <div className={articleCardClass} key={articleObj._id}>
              <div className="flex flex-col h-full">
                {/* Top Content */}
                <div>
                  <p className={articleTitle}>{articleObj.title}</p>

                  <p className={articleBody}>
                    {articleObj.content
                      ? articleObj.content.slice(0, 80) + "..."
                      : ""}
                  </p>

                  <p className={timestampClass}>
                    {formatDateIST(articleObj.createdAt)}
                  </p>
                </div>

                {/* Button */}
                <button
                  className={`${ghostBtn} mt-auto pt-4`}
                  onClick={() => navigateToArticleByID(articleObj)}
                >
                  Read Article →
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UserDashboard;