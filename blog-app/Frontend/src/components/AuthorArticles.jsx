import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/authStore";

import {
  articleCardClass,
  articleTitle,
  articleExcerpt,
  articleMeta,
  ghostBtn,
  loadingClass,
  errorClass,
  emptyStateClass,
} from "../styles/common.js";

function AuthorArticles() {
  const navigate = useNavigate();
  const user = useAuth((state) => state.currentUser);

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch articles of logged-in author
  useEffect(() => {
  if (!user) return;

  // get correct author id
  const authorId = user._id || user.userId;

  if (!authorId) return;

  const getAuthorArticles = async () => {
    setLoading(true);

    try {
      console.log("Author ID:", authorId);

      const res = await axios.get(
        `http://localhost:4000/author-api/articles/${authorId}`,
        { withCredentials: true }
      );

      setArticles(res.data.payload || []);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || "Failed to fetch articles");
    } finally {
      setLoading(false);
    }
  };

  getAuthorArticles();
}, [user]);

  // Open article page
  const openArticle = (article) => {
    navigate(`/article/${article._id}`, { state: article });
  };

  // Open edit page
  const editArticle = (article) => {
  if (!article?._id) return;
  navigate(`/edit-article/${article._id}`, { state: article });
};

  // Format date
  const formatDate = (date) => {
    return new Date(date).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
    });
  };

  // Loading state
  if (loading) {
    return <p className={loadingClass}>Loading articles...</p>;
  }

  // Error state
  if (error) {
    return <p className={errorClass}>{error}</p>;
  }

  // Empty state
  if (articles.length === 0) {
    return (
      <div className={emptyStateClass}>
        You haven't published any articles yet.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {articles.map((article) => (
        <div key={article._id} className={`${articleCardClass} flex flex-col`}>
          
          {/* Article Info */}
          <div className="flex flex-col gap-2">
            <p className={articleMeta}>{article.category}</p>

            <p className={articleTitle}>{article.title}</p>

            <p className={articleExcerpt}>
              {article.content?.slice(0, 60)}...
            </p>

            <p className={articleMeta}>{formatDate(article.createdAt)}</p>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 mt-auto pt-4">
            <button
              className={ghostBtn}
              onClick={() => openArticle(article)}
            >
              Read →
            </button>

            <button
              className={ghostBtn}
              onClick={() => editArticle(article)}
            >
              Edit ✏️
            </button>
          </div>

        </div>
      ))}
    </div>
  );
}

export default AuthorArticles;