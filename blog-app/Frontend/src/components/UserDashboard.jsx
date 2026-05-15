const API = import.meta.env.VITE_API_URL;
import { useAuth } from "../store/authStore";
import { useNavigate } from "react-router-dom";
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
          `${API}/user-api/articles`,
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

  // UTC → IST
  const formatDateIST = (date) => {
    return new Date(date).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
      timeStyle: "short",
    });
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
    <section className="max-w-6xl mx-auto px-6 py-10">

      {error && <p className={errorClass}>{error}</p>}

      {/* Profile Header */}
      <div className="bg-[#f5f5f7] border border-[#e8e8ed] rounded-[32px] p-8 md:p-10 mb-12">

        <div className="flex flex-col md:flex-row md:items-center gap-6">

          {/* Profile Image */}
          <div className="w-24 h-24 rounded-full overflow-hidden border border-[#d2d2d7]">

            <img
              src={
                user?.profileImageUrl ||
                `https://ui-avatars.com/api/?name=${user?.firstName || "User"}`
              }
              alt="profile"
              className="w-full h-full object-cover"
            />

          </div>

          {/* User Info */}
          <div className="flex-1">

            <h1 className="text-3xl font-bold tracking-tight text-[#1d1d1f] mb-2">
              Welcome, {user?.firstName || "User"} 👋
            </h1>

            <p className="text-[#6e6e73] text-sm mb-4">
              {user?.email}
            </p>

            <div className="flex items-center gap-3 flex-wrap">

              <span className="bg-white border border-[#d2d2d7] px-4 py-1.5 rounded-full text-sm text-[#1d1d1f]">
                Reader
              </span>

              <span className="text-sm text-[#6e6e73]">
                Welcome back to your dashboard
              </span>

            </div>

          </div>

        </div>

      </div>

      {/* Articles Section */}
      <div className="mb-8">

        <h2 className="text-2xl font-bold tracking-tight text-[#1d1d1f] mb-2">
          Your Articles
        </h2>

        <p className="text-[#6e6e73]">
          Read and explore published articles.
        </p>

      </div>

      {/* Articles */}
      {articles.length === 0 ? (
        <div className="bg-[#f5f5f7] rounded-3xl p-16 text-center border border-[#e8e8ed]">

          <p className="text-[#6e6e73] text-lg">
            No articles available
          </p>

        </div>
      ) : (
        <div className={articleGrid}>

          {articles.map((articleObj) => (
            <div
              className={`${articleCardClass} rounded-3xl border border-[#e8e8ed] hover:-translate-y-1 transition-all duration-300`}
              key={articleObj._id}
            >

              <div className="flex flex-col h-full">

                {/* Top Content */}
                <div>

                  <p className={`${articleTitle} mb-3`}>
                    {articleObj.title}
                  </p>

                  <p className={`${articleBody} line-clamp-3`}>
                    {articleObj.content
                      ? articleObj.content.slice(0, 120) + "..."
                      : ""}
                  </p>

                  <p className={`${timestampClass} mt-4`}>
                    {formatDateIST(articleObj.createdAt)}
                  </p>

                </div>

                {/* Button */}
                <button
                  className={`${ghostBtn} mt-auto pt-6 text-left`}
                  onClick={() => navigateToArticleByID(articleObj)}
                >
                  Read Article →
                </button>

              </div>

            </div>
          ))}

        </div>
      )}
    </section>
  );
}

export default UserDashboard;